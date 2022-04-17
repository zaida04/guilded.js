import { yellowBright } from "colorette";
import { opendir } from "fs/promises";
import path from "path";

/** Walks through a directory allowing you to process it with a for await loop */
export async function* walk(dir: string): AsyncGenerator<any, any, unknown> {
    const folder = await opendir(dir).catch((error) => {
        if (error.message.startsWith("ENOENT: no such file or directory")) {
            console.log(
                yellowBright(
                    `[WARN] Missing folder: ${dir.substring(
                        dir.lastIndexOf("/"),
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

        if (![".js", ".ts"].some((suffix) => entry.endsWith(suffix))) continue;
        else if (d.isFile()) yield [d.name, require(entry)];
    }

    // LOAD DIRECTORIES AFTER FILES TO ALLOW SUBCOMMANDS TO HAVE COMMAND FILES MADE FIRST!
    for (const directory of directories) yield* walk(directory);
}

export default walk;
