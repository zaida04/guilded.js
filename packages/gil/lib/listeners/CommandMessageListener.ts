import { Message, Role } from "guilded.js";
import * as lexure from "lexure";
import { GilClient } from "../GilClient";
import { StoredRole, StoredRoleType } from "../adapters/db/DatabaseAdapter";
import { convertArguments } from "../arguments/ArgumentParser";
import { CommandMessageParams } from "../events";
import { Listener, ListenerContext } from "../structures/Listener";

export default class CommandMessageListener extends Listener {
	constructor(gil: GilClient) {
		super(gil, { event: "commandMessage", emitter: "gil" });
	}

	async execute(ctx: ListenerContext, params: CommandMessageParams) {
		const result = this.parseCommand(params.message.content, params.prefix);
		if (!result) {
			this.gil.logger.debug("Invalid parsing of command", params.message.id);
			return;
		}

		const { name, args: parsedArgs } = result;
		const command = this.gil.commands.getCommand(name);
		if (!command) {
			this.gil.logger.debug(`Command ${name} not found`, params.message.id);
			return;
		}

		const serverRoles = await this.gil.db.getRoles(params.server.server_id);
		const permissionsCheck = this.userPermissionsCheck({
			userRoles: params.member.roleIds.map((x) => x.toString()),
			serverRoles,
			requiredRoleType: command.options.userRole,
		});

		// if user is an operator, skip all the perm checks
		if (!this.gil.options.operators?.includes(params.member.id)) {
			if (command.options.operatorOnly) {
				this.gil.logger.debug(`User tried to run a dev only command ${name}`, params.message.id);
				return;
			}

			if (!permissionsCheck) {
				this.gil.logger.debug(`User does not have permissions for command ${name}`, params.message.id);
				return;
			}

			if (command.options.serverPremiumLevel && this.gil.options.premiumPrioritys) {
				const serverPremiumPriority = this.gil.options.premiumPrioritys.indexOf(params.server.premium_level);
				const requiredMinimumPriority = this.gil.options.premiumPrioritys.indexOf(command.options.serverPremiumLevel);

				if (serverPremiumPriority < requiredMinimumPriority) {
					this.gil.logger.debug(`Server does not have the required premium level for command ${name}`, params.message.id);
					// todo: allow user to put premium prompt message
					return;
				}
			}

			if (command.options.additionalCheck && !command.options.additionalCheck(params)) {
				this.gil.logger.debug("User failed the command additional check", params.message.id);
				return;
			}
		}

		const attemptConvertArguments = await convertArguments({
			args: parsedArgs,
			message: params.message,
			command,
		});

		if (attemptConvertArguments.error) {
			this.gil.logger.debug(`Error converting arguments for command ${name}, reason: ${attemptConvertArguments.reason_code}`, params.message.id);
			// TODO: in-depth error messages for users
			return;
		}

		const context = this.gil.options?.contexts?.command
			? await this.gil.options.contexts.command({
					server: params.server,
					message: params.message,
			  })
			: {};

		this.gil.emitter.emit("commandRan", {
			message: params.message,
			member: params.member,
			server: params.server,
			command,
		});

		try {
			await command.execute({
				message: params.message,
				args: attemptConvertArguments.arguments,
				...context,
			});
		} catch (e) {
			// todo: user friendly error "something went wrong" message

			this.gil.logger.error(e as Error);
			this.gil.logger.warn(`Error executing command ${name}`, params.message.id);
			this.gil.options.errorHandler?.command?.(e as Error, {
				message: params.message,
				member: params.member,
				server: params.server,
				command,
			});
		}
	}

	private parseCommand(content: string, prefix: string): { name: string; args: string[] } | null {
		const lexer = new lexure.Lexer(content);
		lexer.setQuotes([
			['"', '"'],
			["'", "'"],
			["“", "”"],
		]);

		const parsed = lexer.lexCommand((token) => (token.startsWith(prefix) ? prefix.length : null));
		if (!parsed) return null;
		const getArgs = parsed[1];

		return {
			name: parsed[0].value.toLowerCase(),
			args: getArgs().map((arg) => arg.value),
		};
	}

	private userPermissionsCheck(options: {
		userRoles: string[];
		serverRoles: StoredRole[];
		requiredRoleType?: StoredRoleType;
	}): boolean {
		if (!options.requiredRoleType) return true;

		const rolePrioritys = [StoredRoleType.Minimod, StoredRoleType.Mod, StoredRoleType.Admin];

		// given user roles ["role_1", "role_2", "role_3"]
		// server roles [{ "role_id": "role_2", "type": "minimod" }]
		// this will transform it into [-1, 0, -1] (turns into priority indexes, -1 if role is not a role with priority)
		const userRolesPrioritys = options.userRoles.map((userRoleId) => {
			const serverRole = options.serverRoles.find((serverRole) => serverRole.role_id === userRoleId);
			const priority = serverRole ? rolePrioritys.indexOf(serverRole.type) : -1;
			if (priority === -1) return -1;

			return priority;
		});

		const userHighestRolePriority = Math.max(...userRolesPrioritys);
		if (userHighestRolePriority === -1) return false;

		const requiredRolePriority = rolePrioritys.indexOf(options.requiredRoleType);
		return userHighestRolePriority >= requiredRolePriority;
	}
}
