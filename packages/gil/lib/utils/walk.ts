import { opendir } from "node:fs/promises";
import path from "node:path";
import { yellowBright } from "colorette";

/**
 * Walks through a directory allowing you to process it with a for await loop
 */
export async function* walk(dir: string): AsyncGenerator<any, any, unknown> {
    const folder = await opendir(dir).catch((error) => {
        if (error.message.startsWith("ENOENT: no such file or directory")) {
            console.log(
                yellowBright(
                    `[WARN] Missing folder: ${dir.slice(
                        Math.max(0, dir.lastIndexOf("/")),
                    )}. To make this warning go away, simply create the folder in your src folder.`,
                ),
            ); 
        } else console.log(error);
    });
    if (!folder) return;

    const directories: string[] = [];

    for await (const d of folder) {
        const entry = path.join(dir, d.name);
        // if (d.isDirectory()) yield* walk(entry);
        if (d.isDirectory()) directories.push(entry);

        // Skip any non-js/ts file
        if (![".js", ".ts"].some((suffix) => entry.endsWith(suffix))) continue;
        // since declaration files end with ts they need to be ignored as well
        else if (entry.endsWith(".d.ts")) continue;
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        else if (d.isFile()) yield [d.name, require(entry)];
    }

    // LOAD DIRECTORIES AFTER FILES TO ALLOW SUBCOMMANDS TO HAVE COMMAND FILES MADE FIRST!
    for (const directory of directories) yield* walk(directory);
}

export default walk;
