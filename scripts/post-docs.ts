import { writeFile } from "node:fs/promises";
import { join } from "node:path";

void (async (): Promise<void> => {
    await writeFile(join(__dirname, "..", "docs", "CNAME"), "guilded.js.org");
    console.log("CREATED CNAME");
})();
