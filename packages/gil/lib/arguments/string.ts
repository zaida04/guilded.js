import { Argument } from "../structures/Argument";
import type { CommandArgument } from "../structures/Command";

export class StringArgument extends Argument {
	name =
		"string";

	execute(
		argument: CommandArgument,
		parameters: string[],
	):
		| string
		| undefined {
		const [
			text,
		] =
			parameters;

		const valid =
			// If the argument required literals and some string was provided by user
			argument
				.literals
				?.length &&
			text
				? argument.literals.includes(
						text.toLowerCase(),
				  )
					? text
					: undefined
				: text;

		if (
			valid
		) {
			return argument.lowercase
				? valid.toLowerCase()
				: valid;
		}
	}

	init(): void {
		// shut up eslint
	}
}

export default StringArgument;
