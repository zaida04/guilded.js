import BotClient from "../lib";

const bot = new BotClient({
    token: "test",
    prefix: ".",
    sourceFolderPath: __dirname,
});

void bot.connect();
