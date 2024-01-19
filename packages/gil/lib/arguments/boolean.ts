import { Argument } from "../structures/Argument";
import type { CommandArgument } from "../structures/Command";

export class BooleanArgument extends Argument {
	name = "boolean";

	execute(argument: CommandArgument, parameters: string[]): boolean | undefined {
		const [boolean] = parameters;

		if (["true", "false", "on", "off", "enable", "disable"].includes(boolean)) {
			return ["true", "on", "enable"].includes(boolean);
		}
	}

	init(): void {
		// shut up eslint
	}
}

export default BooleanArgument;
