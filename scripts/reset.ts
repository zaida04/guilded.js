import { join } from "path";
import rimraf from "rimraf";
const BASE_DIR = join(__dirname, "..");

rimraf.sync(join(BASE_DIR, "node_modules"));
console.log("Deleting root node_modules");

["common", "guilded-api-typings", "guilded.js", "ws", "rest", "webhook-client"].forEach((pkg) => {
    ["node_modules", "dist", "types"].forEach((dir) => {
        console.log(`Deleting package ${pkg} ${dir}`);
        rimraf.sync(join(BASE_DIR, "packages", pkg, dir));
    });
});
