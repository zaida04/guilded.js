const { access } = require("fs/promises");
const { join } = require("path");
const ENV_PATH = join(__dirname, "..", ".env");

void (async () => {
    if (process.env.CI) return;
    try {
        await access(ENV_PATH);
    } catch (e) {
        throw new Error("An .env file is required at the root of this project to run tests. Please make sure it exists and is readable.");
    }
})();
