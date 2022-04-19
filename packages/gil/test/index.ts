import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, "..", ".env") });

import { BotClient } from "../lib";

const bot = new BotClient({
    token: process.env.TOKEN!,
    prefix: ".",
    sourceFolderPath: __dirname,
});

void bot.login();
