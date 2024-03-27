import { isUUID } from "../../utils/uuid";
import type { CommandArgumentValidator } from "../ArgumentParser";

export default {
	validate: async ({ input, mentionCounters, message, rawArgs, argIndex }) => {
		if (input.startsWith("#")) {
			const mention = message.mentions?.channels?.[mentionCounters.channels++];
			if (!mention)
				return {
					error: true,
					reason_code: "NO_CHANNEL_IN_MENTIONS",
				};

			const channel = await message.client.channels.fetch(mention.id).catch(() => null);
			if (!channel) return { error: true, reason_code: "CHANNEL_NOT_FOUND" };

			const spaceCount = channel.name.split(" ").length;
			// [..., "#super", "cool", "channel", ...] => [..., "#super cool channel", ...]
			rawArgs.splice(argIndex + 1, spaceCount - 1);
			rawArgs[argIndex] = channel.name;

			return { error: false, argument: channel };
		}

		if (isUUID(input)) {
			const channel = await message.client.channels.fetch(input);
			if (!channel) return { error: true, reason_code: "CHANNEL_NOT_FOUND" };

			return { error: false, argument: channel };
		}

		return { error: true, reason_code: "INVALID_CHANNEL_ETC" };
	},
} satisfies CommandArgumentValidator;
