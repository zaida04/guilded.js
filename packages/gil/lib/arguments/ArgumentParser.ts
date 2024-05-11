import type { Channel, Message, PartialMember, Role } from "guilded.js";
import type { Command } from "../structures/Command";

import boolean from "./args/boolean";
import channel from "./args/channel";
import member from "./args/member";
import number from "./args/number";
import role from "./args/role";
import string from "./args/string";

export type Result<T> = ({ error: false } & T) | { error: true; reason_code: string; extra_info?: unknown };
export type CommandArgument = string | number | boolean | PartialMember | Message | Channel | Role | null;
export type CommandArgumentType = "string" | "number" | "boolean" | "member" | "channel" | "role";
export type CommandArgumentValidator = {
	validate: (ctx: {
		input: string;
		rawArgs: string[];
		argument: CommandArgument;
		message: Message;
		argIndex: number;
		mentionCounters: { users: number; roles: number; channels: number };
	}) => Result<{ argument: CommandArgument }> | Promise<Result<{ argument: CommandArgument }>>;
};

const validators: Record<CommandArgumentType, CommandArgumentValidator> = {
	boolean,
	string,
	channel,
	member,
	number,
	role,
};
export async function convertArguments(params: {
	args: string[];
	command: Command;
	message: Message;
}): Promise<Result<{ arguments: Record<string, CommandArgument> }>> {
	if (!params.command.options.args) return { error: false, arguments: {} };

	const castedArguments: Record<string, CommandArgument> = {};
	const mentionCounters = { users: 0, roles: 0, channels: 0 };
	const commandArgs = params.command.options.args;

	for (let i = 0; i < commandArgs.length; i++) {
		const currentArg = commandArgs[i];
		const currentInput = params.args[i];

		if (currentArg.optional && params.args.length <= i) {
			castedArguments[currentArg.name] = null;
			continue;
		}

		if (currentInput === undefined) {
			if (currentArg.optional) {
				castedArguments[currentArg.name] = null;
				continue;
			}

			return { error: true, reason_code: "MISSING_ARGUMENT", extra_info: { argument: currentArg } };
		}

		const validator = validators[currentArg.type].validate;
		const validation_run = await validator({
			mentionCounters,
			rawArgs: params.args,
			message: params.message,
			argument: castedArguments[currentArg.name],
			argIndex: i,
			input: currentInput,
		});

		if (validation_run.error) {
			return { error: true, reason_code: validation_run.reason_code };
		}

		castedArguments[currentArg.name] = validation_run.argument;
	}

	return {
		error: false,
		arguments: castedArguments,
	};
}
