import { Command, CommandExecuteContext, GilClient } from "../../../lib";

export default class Help extends Command {
	public constructor(client: GilClient) {
		super(client, {
			name: "help",
			description: "Shows this help message.",
			aliases: ["h"],
			args: [
				{
					name: "command",
					optional: true,
					type: "string",
				},
			],
		});
	}

	public async execute(ctx: CommandExecuteContext<{ command: string }>) {
		const { command } = ctx.args;

		if (command) {
			const getCommand = this.gil.commands.getCommand(command);
			if (!getCommand) {
				return ctx.message.reply("Command not found.");
			}

			return ctx.message.reply(`Help for ${getCommand.options.name}`);
		}

		const allCommands = this.gil.commands.commands.map((command) => command.options.name);
		return ctx.message.reply(`All commands: ${allCommands.join(", ")}`);
	}
}
