import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { JSONOutput } from "typedoc";

const fetchDocs = async () => (process.env.NODE_ENV === "development" ?
	// eslint-disable-next-line @typescript-eslint/promise-function-async
	await fetch("https://raw.githubusercontent.com/guildedjs/guildedjs.github.io/main/output.json").then(x => x.json())
	: JSON.parse(await readFile(join(process.cwd(), "..", "..", "docs", "output.json"), "utf8"))) as Promise<JSONOutput.ContainerReflection>

export default fetchDocs;