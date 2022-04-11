import type { Command } from "../Command.js";

export default {
    aliases: ["ping"],
    execute: (msg) => msg.client.messages.send(msg.channelId, "pong!"),
    name: "ping",
} as Command;
