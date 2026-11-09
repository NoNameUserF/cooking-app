import fs from "fs";
import path from "path";

import fg from "fast-glob";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

function getPublicFiles() {
    return fg.sync(path.join(PUBLIC_DIR, "**/*.*")).map(f =>
        path.relative(PUBLIC_DIR, f)
    );
}

function getSourceFiles() {
    return fg.sync(path.join(ROOT, "**/*.{js,jsx,ts,tsx,css,html,json,md}"), {
        ignore: ["node_modules/**"],
    });
}

function findUnusedFiles() {
    const publicFiles = getPublicFiles();
    const sourceFiles = getSourceFiles();

    let allCode = "";
    for (const file of sourceFiles) {
        try {
            allCode += fs.readFileSync(file, "utf8") + "\n";
        } catch (err) {
            console.error("Ошибка чтения:", file, err.message);
        }
    }

    const unused = publicFiles.filter(f => {
        const normalized = f.replace(/\\/g, "/");
        return !allCode.includes(normalized);
    });

    return unused;
}

const unusedFiles = findUnusedFiles();

if (unusedFiles.length === 0) {
    console.log("✅ Все файлы из public используются.");
    process.exit(0)

} else {
    console.log("❌ Неиспользуемые файлы в public:");
    unusedFiles.forEach(f => console.log(" -", f));
    process.exit(1)
}
