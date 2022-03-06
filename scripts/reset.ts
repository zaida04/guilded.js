import rimraf from "rimraf";
import { join } from "path";
const BASE_DIR = join(__dirname, "..");
const packages = ["common", "guilded-api-typings", "guilded.js", "ws", "rest"];
const subDirs = ["node_modules", "dist", "types"];

rimraf.sync(join(BASE_DIR, "node_modules"));
console.log("Deleting root node_modules");
packages.forEach((pkg) => {
    subDirs.forEach((dir) => {
        rimraf.sync(join(BASE_DIR, "packages", pkg, dir));
        console.log(`Deleting package ${pkg} ${dir}`);
    });
});
