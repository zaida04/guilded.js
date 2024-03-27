import type { CommandArgumentValidator } from "../ArgumentParser";

const MAX_LIMIT = 2147483647;
const MIN_LIMIT = -MAX_LIMIT - 1;

export default {
	validate: ({ input, argument }) => {
		const castedNumber = Number(input);
		if (Number.isNaN(castedNumber)) {
			return { error: true, reason_code: "INVALID_NUMBER" };
		}

		if (castedNumber > MAX_LIMIT || castedNumber < MIN_LIMIT) {
			return { error: true, reason_code: "NUMBER_OUT_OF_RANGE" };
		}

		return { error: false, argument: castedNumber };
	},
} satisfies CommandArgumentValidator;
