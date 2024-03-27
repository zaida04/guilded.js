import type { CommandArgumentValidator } from "../ArgumentParser";

export default {
	validate: ({ input }) => {
		if (typeof input !== "string") {
			return {
				error: true,
				reason_code: "BAD_STRING",
			};
		}
		return {
			error: false,
			argument: input,
		};
	},
} satisfies CommandArgumentValidator;
