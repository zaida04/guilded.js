import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { JSONOutput } from "typedoc";

const fetchDocs = async () => {
	if (process.env.NODE_ENV === "development") return JSON.parse(await readFile(join(process.cwd(), "..", "..", "docs", "output.json"), "utf8")) as Promise<JSONOutput.ContainerReflection>
	const req = await fetch("https://raw.githubusercontent.com/guildedjs/guildedjs.github.io/main/output.json");
	return req.json() as Promise<JSONOutput.ContainerReflection>;
}

export default fetchDocs;