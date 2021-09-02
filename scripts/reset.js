const rimraf = require("rimraf");
const { join } = require("path");
const BASE_DIR = join(__dirname, "..");
const packages = ["common", "embeds", "guilded-api-typings", "guilded.js", "webhook-client", "rest"];
const subDirs = ["node_modules", "dist", "types"];

rimraf.sync(join(BASE_DIR, "node_modules"));
console.log("Deleting root node_modules");
packages.forEach((package) => {
    subDirs.forEach((dir) => {
        rimraf.sync(join(BASE_DIR, "packages", package, dir));
        console.log(`Deleting package ${package} ${dir}`);
    });
});
