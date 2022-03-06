import { execSync } from "child_process";
import { join } from "path";

const commands = ["yarn install", "yarn build"];
commands.forEach((command) => execSync(command, { cwd: join(__dirname, "..") }));
