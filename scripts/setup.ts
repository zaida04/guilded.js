import { exec } from "child_process";
import { join } from "path";

const stdout = (...args: any[]): void => console.log(args);
["pnpm install -r", "pnpm run build"].forEach((command) => exec(command, { cwd: join(__dirname, "..") }, stdout));
