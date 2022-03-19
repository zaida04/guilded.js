import type { Command } from "../Command.js";

export default {
    aliases: ["speak", "talk"],
    execute: (msg, args) => msg.client.messages.sendMessage(msg.channelId, args.join(" ")),
    name: "echo",
} as Command;
