const { execSync } = require("child_process");
const { join } = require("path");

const commands = ["npm i", "npm run bootstrap", "npm run build"];
commands.forEach((command) => execSync(command, { cwd: join(__dirname, "..") }));
