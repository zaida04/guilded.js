import { Argument } from "../structures/Argument";
import type { CommandArgument } from "../structures/Command";

export class RemainingStringArgument extends Argument {
    name = "...string";

    execute(argument: CommandArgument, parameters: string[]): string | undefined {
        if (!parameters.length) return;

        return argument.lowercase ? parameters.join(" ").toLowerCase() : parameters.join(" ");
    }

    init(): void {
        // shut up eslint
    }
}

export default RemainingStringArgument;
