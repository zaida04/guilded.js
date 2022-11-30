import type { Message } from "guilded.js";
import { Argument } from "../structures/Argument";
import type { Command, CommandArgument } from "../structures/Command";

export class SubcommandArgument extends Argument {
    name = "subcommand";

    execute(argument: CommandArgument, parameters: string[], message: Message, command: Command): Command | undefined {
        const subcommandName = parameters[0]?.toLowerCase();
        if (!subcommandName) return;

        const sub = command.subcommands?.find((sub) => sub.name === subcommandName || Boolean(sub.aliases?.includes(subcommandName)));
        if (sub) return sub;

        return typeof argument.defaultValue === "string" ? command.subcommands?.get(argument.defaultValue) : undefined;
    }

    init(): void {
        // shut up eslint
    }
}

export default SubcommandArgument;
