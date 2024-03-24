import { Collection } from "@discordjs/collection";
import glob from "fast-glob";
import { Message } from "guilded.js";
import { GilClient } from "../GilClient";
import { Manager } from "./Manager";

export interface CommandOptions {
	// The internal-safe name of the command
	name: string;
	// A brief description of the command
	description?: string;
	// The category the command belongs to
	category?: string;
	// The command's aliases
	aliases?: string[];
	// The command's usage syntax
	usage?: string;
	// The command's cooldown in milliseconds
	cooldownMS?: number;
	// Whether the command can only be used by the bot owner
	ownerOnly?: boolean;
	// The permissions the executing user must have to run this command
	userPermissions?: string[];
	// The permissions the bot must have in this server to run this command
	botPermissions?: string[];
	// The premium level the guild must have to run this command
	premiumGuildLevel?: string;
	// The premium level the user must have to run this command
	premiumUserLevel?: string;
}
export abstract class Command {
	public constructor(
		public readonly gil: GilClient,
		public readonly options: CommandOptions,
	) {}

	public abstract execute(commandContext: CommandExecuteContext): unknown | Promise<unknown>;
}

interface CommandExecuteContext {
	message: Message;
	args: string[];
}

export class CommandManager extends Manager {
	public readonly commands = new Collection<string, Command>();

	public async init(): Promise<void> {
		this.gil.logger.info("Loading commands...");
		const files = await glob(`${this.gil.options.commandDirectory}/**/*.ts`, {
			dot: true,
			absolute: true,
			concurrency: 10,
		});
		if (!files.length) return this.gil.logger.warn("Despite providing a command directory, no commands were found.");

		for (const file of files) {
			const imported = await import(file);
			if (!imported.default) {
				this.gil.logger.warn(`Command file ${file} does not export a default export.`);
				continue;
			}

			const createdCommand: Command = new imported.default(this.gil);
			this.gil.logger.info(`Command ${createdCommand.options.name} loaded.`);
			this.commands.set(createdCommand.options.name, createdCommand);
		}
	}
}
