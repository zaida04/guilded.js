import type { CommandArgumentValidator } from "../ArgumentParser";

export default {
	validate: async ({ input, mentionCounters, message, rawArgs, argIndex }) => {
		if (input.startsWith("@")) {
			const mention = message.mentions?.roles?.[mentionCounters.roles++];
			if (!mention) return { error: true, reason_code: "NO_ROLE_IN_MENTIONS" };

			const role = await message.client.roles.fetch(message.serverId!, mention.id).catch(() => null);
			if (!role) return { error: true, reason_code: "ROLE_NOT_FOUND" };

			const name = role.name;
			const spaceCount = name.split(" ").length;
			rawArgs.splice(argIndex + 1, spaceCount - 1);
			rawArgs[argIndex] = name;

			return { error: false, argument: role };
		}

		const parsed = Number(input);
		if (!Number.isNaN(parsed)) {
			const role = await message.client.roles.fetch(message.serverId!, parsed).catch(() => null);
			if (!role) return { error: true, reason_code: "ROLE_NOT_FOUND" };

			return { error: false, argument: role };
		}

		return { error: true, reason_code: "INVALID_ROLE_INPUT" };
	},
} satisfies CommandArgumentValidator;
