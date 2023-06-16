import { join } from "node:path";
import { move } from "fs-extra";

export const pathsToPreserve = ["lib/generated/router/core", "lib/generated/router/GuildedRouter.ts"];

const main = async (): Promise<void> => {
    for (const path of pathsToPreserve) {
        await move(join(__dirname, "..", path), join(__dirname, "..", "preserve", path), { overwrite: true });
    }
};

void main();
