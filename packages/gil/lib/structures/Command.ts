import { Message } from "guilded.js";
import GilClient from "../GilClient";

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
export default abstract class Command<CustomContext extends {}> {
	public constructor(
		public readonly client: GilClient,
		public readonly options: CommandOptions,
	) {}

	public abstract execute(commandContext: CommandExecuteContext, customContext: CustomContext): unknown | Promise<unknown>;
}

interface CommandExecuteContext {
	message: Message;
	args: string[];
}
