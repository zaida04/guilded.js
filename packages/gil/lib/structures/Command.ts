import { Collection } from "@discordjs/collection";
import glob from "fast-glob";
import { Message } from "guilded.js";
import { GilClient } from "../GilClient";
import { StoredRoleType } from "../adapters/db/DatabaseAdapter";
import { CommandArgument, CommandArgumentType } from "../arguments/ArgumentParser";
import { CommandMessageParams } from "../events";
import { Manager } from "./Manager";

export interface CommandOptions {
	// The internal-safe name of the command
	name: string;
	// A brief description of the command
	description?: string;
	// The arguments this command takes
	args?: { name: string; type: CommandArgumentType; optional?: boolean }[];
	// The category the command belongs to
	category?: string;
	// The command's aliases
	aliases?: string[];
	// The command's usage syntax
	usage?: string;
	// The command's cooldown in milliseconds
	cooldownMS?: number;
	// Whether the command can only be used by devs
	operatorOnly?: boolean;
	// A last-pass function that decides whether the user can run the command or not
	additionalCheck?: (context: CommandMessageParams) => boolean;
	// Whether the command can only be used by the server owner
	serverOwnerOnly?: boolean;
	// The role the executing user must have (or higher) to run this command
	userRole?: StoredRoleType;
	// The permissions the bot must have in this server to run this command
	botPermissions?: string[];
	// The premium level the guild must have to run this command
	serverPremiumLevel?: string;
	// The premium level the user must have to run this command
	premiumUserLevel?: string;
}
export abstract class Command {
	public constructor(
		public readonly gil: GilClient,
		public readonly options: CommandOptions,
	) {}

	public abstract execute(commandContext: CommandContext<unknown, unknown>): unknown | Promise<unknown>;
}

export interface CommandExecuteContext<Args = Record<string, CommandArgument>> {
	message: Message;
	args: Args;
}

export type CommandContext<T, Args = Record<string, CommandArgument>> = T & CommandExecuteContext<Args>;

export class CommandManager extends Manager {
	public readonly commands = new Collection<string, Command>();

	public getCommand(name: string): Command | null {
		const lookupByName = this.commands.get(name);
		if (lookupByName) return lookupByName;

		const lookupByAlias = this.commands.find((command) => command.options.aliases?.includes(name));
		if (lookupByAlias) return lookupByAlias;

		return null;
	}

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
