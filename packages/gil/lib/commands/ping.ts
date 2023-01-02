import type { Message } from "guilded.js";
import { Command } from "../structures/Command";

export class PingCommand extends Command {
    name = "ping";

    execute(message: Message): any {
        return this.client.messages.send(message.channelId, "Pong");
    }

    init(): void {
        // comment to shut up eslint error
    }
}

export default PingCommand;
