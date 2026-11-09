import fg from "fast-glob"
import fs from "node:fs/promises"
import path from "node:path"
import postcss from "postcss"
import selectorParser from "postcss-selector-parser"

const norm = (p) => path.normalize(p).toLowerCase() // normalize paths for Windows

// Extract classes ONLY from selectors (via CSS AST)
async function getCssModuleClasses(cssFile) {
    const css = await fs.readFile(cssFile, "utf8")
    const root = postcss.parse(css)
    const classes = new Set()

    const collect = selectorParser((sels) => {
        sels.walkClasses((cls) => {
            // cls.value is the class name without the dot
            classes.add(cls.value)
        })
    })

    root.walkRules((rule) => {
        // skip at-rules like @keyframes, @font-face, etc.
        if (!rule.selector) return
        try {
            collect.processSync(rule.selector)
        } catch {
            // ignore invalid or exotic selectors
        }
    })

    return classes
}

// Parse code files and collect used classes for each imported CSS module
async function getUsedByCssModuleFromCode(codeFile) {
    const code = await fs.readFile(codeFile, "utf8")
    const dir = path.dirname(codeFile)
    const map = new Map() // cssAbs -> { alias:Set<string>, used:Set<string> }

    // import styles from './x.module.css'
    // import * as styles from './x.module.css'
    const importRx = /import\s+(?:\*\s+as\s+)?(\w+)\s+from\s+['"]([^'"]+\.module\.css)['"]/g
    let im
    while ((im = importRx.exec(code))) {
        const alias = im[1]
        const rel = im[2]
        const abs = norm(path.resolve(dir, rel))
        if (!map.has(abs)) map.set(abs, { aliases: new Set(), used: new Set() })
        map.get(abs).aliases.add(alias)
    }
    if (map.size === 0) return map

    for (const { aliases, used } of map.values()) {
        for (const alias of aliases) {
            // styles.foo
            const dotRx = new RegExp(String.raw`${alias}\.([A-Za-z0-9_]+)`, "g")
            let m1
            while ((m1 = dotRx.exec(code))) used.add(m1[1])

            // styles["foo-bar"] / styles['foo-bar']
            const brRx = new RegExp(String.raw`${alias}\[['"]([^'"]+)['"]\]`, "g")
            let m2
            while ((m2 = brRx.exec(code))) used.add(m2[1])
        }

        // className="foo bar" — in case of :global or mixed classes
        const classAttrRx = /className\s*=\s*["'`]([^"'`]+)["'`]/g
        let m3
        while ((m3 = classAttrRx.exec(code))) {
            const candidates = m3[1].split(/\s+/).filter(Boolean)
            for (const c of candidates) used.add(c)
        }
    }

    return map
}

async function main() {
    const cssFiles = await fg(["src/**/*.module.css"], { dot: false, absolute: true })
    const codeFiles = await fg(["src/**/*.{ts,tsx,js,jsx}"], { dot: false, absolute: true })

    // declared classes in each CSS module
    const declaredByCss = new Map()
    for (const css of cssFiles) {
        const key = norm(css)
        declaredByCss.set(key, await getCssModuleClasses(css))
    }

    // actually used classes for each CSS module
    const usedByCss = new Map()
    for (const file of codeFiles) {
        const uses = await getUsedByCssModuleFromCode(file)
        for (const [cssAbs, { used }] of uses) {
            if (!usedByCss.has(cssAbs)) usedByCss.set(cssAbs, new Set())
            const set = usedByCss.get(cssAbs)
            for (const cls of used) set.add(cls)
        }
    }

    // report
    let totalUnused = 0
    for (const [cssAbs, declared] of declaredByCss) {
        const used = usedByCss.get(cssAbs) ?? new Set()
        const unused = [...declared].filter((c) => !used.has(c))
        if (unused.length) {
            console.log(`\n${path.relative(process.cwd(), cssAbs)}`)
            for (const c of unused) {
                console.log("  -", c)
                totalUnused++
            }
        }
    }

    if (totalUnused === 0) {
        console.log("✅ All classes from *.module.css are used")
        process.exit(0)
    } else {
        console.log(`\nTOTAL: ${totalUnused} unused classes`)
        process.exit(1)
    }
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
