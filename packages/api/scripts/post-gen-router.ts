import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { move } from "fs-extra";

const pathsToPreserve = ["lib/generated/router/core/", "lib/generated/router/GuildedRouter.ts"];

const pathsToReplace = {
    "lib/generated/router/services/ChatService.ts": ["Record<string, any> | string;", "string;"],
};

const main = async (): Promise<void> => {
    for (const path of pathsToPreserve) {
        await move(join(__dirname, "..", "preserve", path), join(__dirname, "..", path), { overwrite: true });
    }

    for (const path of Object.keys(pathsToReplace)) {
        const [old, replace] = pathsToReplace[path as keyof typeof pathsToReplace];
        const concatPath = join(__dirname, "..", path);
        const file = await readFile(concatPath, "utf8");
        await writeFile(concatPath, file.replace(old, replace));
    }
};

void main();
