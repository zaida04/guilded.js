import REST from "../../../packages/rest";
import "dotenv/config";

["TOKEN", "CHANNEL_ID"].some((x) => {
    if (!process.env[x]) throw new Error(`Missing ${x} env var!`);
});
const rest = new REST({ token: process.env.TOKEN! });

void (async () => {
    await rest.router.createChannelMessage(process.env.CHANNEL_ID!, "Test message!");
})();
