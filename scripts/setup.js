const { execSync } = require("child_process");
const { join } = require("path");

const commands = ["yarn install", "yarn build"];
commands.forEach((command) => execSync(command, { cwd: join(__dirname, "..") }));
