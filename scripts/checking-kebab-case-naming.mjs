import fs from "fs";
import path from "path";

import fg from "fast-glob";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(__dirname, ".."); // корень проекта
const PUBLIC_DIR = path.join(ROOT, "public");
const IGNORE_DIRS = [path.join(PUBLIC_DIR, "core/**")];

function getPublicFiles() {
    return fg
        .sync(path.join(PUBLIC_DIR, "**/*.*"), {
            ignore: [path.join(PUBLIC_DIR, "core/**")], // ⬅️ исключаем core
        })
        .map((f) => ({
            abs: f,
            rel: path.relative(PUBLIC_DIR, f),
        }));
}

function toKebabCase(filename) {
    const ext = path.extname(filename).toLowerCase();
    const name = path.basename(filename, ext);

    return (
        name
            .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
            .replace(/[_\s]+/g, "-")
            .replace(/-+/g, "-")
            .toLowerCase() + ext
    );
}

function fixDirectories() {
    const dirs = fg.sync(path.join(PUBLIC_DIR, "**/"), {
        onlyDirectories: true,
        ignore: IGNORE_DIRS,
        dot: false,
    });
    dirs.sort((a, b) => b.length - a.length);
    const changes = [];

    for (const abs of dirs) {
        const parent = path.dirname(abs);
        const basename = path.basename(abs);
        const kebab = toKebabCase(basename);

        if (basename !== kebab) {
            const newAbs = path.join(parent, kebab);
            fs.renameSync(abs, newAbs);

            const oldRel = path.relative(PUBLIC_DIR, abs);
            const newRel = path.relative(PUBLIC_DIR, newAbs);
            changes.push({
                old: oldRel.replace(/\\/g, "/"),
                new: newRel.replace(/\\/g, "/"),
            });
        }
    }

    return changes;
}

function fixFilenames() {
    const publicFiles = getPublicFiles();
    const changes = [];

    for (const file of publicFiles) {
        const basename = path.basename(file.rel);
        const kebab = toKebabCase(basename);

        if (basename !== kebab) {
            const newAbs = path.join(path.dirname(file.abs), kebab);
            const newRel = path.relative(PUBLIC_DIR, newAbs);

            fs.renameSync(file.abs, newAbs);

            changes.push({
                old: file.rel.replace(/\\/g, "/"),
                new: newRel.replace(/\\/g, "/"),
            });
        }
    }

    return changes;
}

function updateSourceFiles(changes) {
    const sourceFiles = fg.sync(path.join(ROOT, "**/*.{js,jsx,ts,tsx,css,html,json,md}"), {
        ignore: ["node_modules/**"],
    });

    for (const file of sourceFiles) {
        let code = fs.readFileSync(file, "utf8");
        let updated = code;

        for (const {old, new: newPath} of changes) {
            updated = updated.replaceAll(old, newPath);
            updated = updated.replaceAll(`/${old}`, `/${newPath}`);
        }

        if (updated !== code) {
            fs.writeFileSync(file, updated, "utf8");
            console.log("🔧 Обновлен:", file);
        }
    }
}

const dirChanges = fixDirectories();
const fileChanges = fixFilenames();
const changes = [...dirChanges, ...fileChanges];

if (changes.length === 0) {
    console.log("✅ Все файлы (кроме public/core) уже в kebab-case.");
} else {
    console.log("✍️ Переименованы файлы:");
    changes.forEach((c) => console.log(` - ${c.old} → ${c.new}`));

    console.log("\n🔄 Обновляем пути в проекте...");
    updateSourceFiles(changes);

    console.log("\n✅ Готово!");
}
