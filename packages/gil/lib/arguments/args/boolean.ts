import type { CommandArgumentValidator } from "../ArgumentParser";

const yesType = ["true", "enable", "yes"];
const noType = ["disable", "false", "no"];

export default {
	validate: ({ input }) => {
		// if not a proper "yes/no" type input, notify the user
		if (![...yesType, ...noType].includes(input.toLowerCase()))
			return {
				error: true,
				reason_code: "INVALID_BOOLEAN",
			};

		// if the input is a truthy value, the argument will be set to true, otherwise false.
		return {
			error: false,
			argument: yesType.includes(input.toLowerCase()),
		};
	},
} satisfies CommandArgumentValidator;
