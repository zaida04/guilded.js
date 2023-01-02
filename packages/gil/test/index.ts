import { join } from "node:path";
import { config } from "dotenv";
import { BotClient } from "../lib";

config({ path: join(__dirname, "..", ".env") });

const bot = new BotClient({
    token: process.env.TOKEN!,
    prefix: ".",
    sourceFolderPath: __dirname,
});

bot.login();
