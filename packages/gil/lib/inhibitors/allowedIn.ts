import type { Message } from "guilded.js";
import type { Command } from "../structures/Command";
import { Inhibitor } from "../structures/Inhibitor";

export class AllowedInInhibitor extends Inhibitor {
    name = "allowedIn";

    execute(message: Message, command: Command): boolean {
        // The command should be allowed to run because it meets the requirements
        // allowedIn defaults to ["server"]
        if ((!command.allowedIn || command.allowedIn.includes("server")) && message.serverId) return false;

        // If the command is allowed in dms
        if (command.allowedIn?.includes("dm") && !message.serverId) return false;

        // THE COMMANDS NEEDS TO BE INHIBITED.
        console.log(`${command.name} Inhibited: ALLOWED IN`);
        return true;
    }

    init(): void {
        // shut up eslint
    }
}

export default AllowedInInhibitor;
