import { writeFile } from "fs/promises";
import { join } from "path";

void (async () => {
    await writeFile(join(__dirname, "..", "docs", "CNAME"), "guilded.js.org");
    console.log("CREATED CNAME");
})();
