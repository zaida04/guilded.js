import { Argument } from "../structures/Argument";
import type { Command, CommandArgument } from "../structures/Command";

export default class CommandTypeArgument extends Argument {
    name = "command";

    execute(argument: CommandArgument, parameters: string[]): Command | undefined {
        const [name] = parameters;
        if (!name) return;

        const commandName = name.toLowerCase();
        const command = this.client.commands.get(commandName);
        if (command) return command;

        // Check if its an alias
        return this.client.commands.find((cmd) => Boolean(cmd.aliases?.includes(commandName)));
    }

    init(): void {
        // shut up eslint
    }
}
