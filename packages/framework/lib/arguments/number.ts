import { Argument } from "../structures/Argument";
import type { CommandArgument } from "../structures/Command";

export class NumberArgument extends Argument {
    name = "number";

    execute(argument: CommandArgument, parameters: string[]): number | undefined {
        const [number] = parameters;

        const valid = Number(number);
        if (!valid) return;

        if (valid < (argument.minimum || 0)) return;
        if (argument.maximum && valid > argument.maximum) return;
        if (!argument.allowDecimals) return Math.floor(valid);

        if (valid) return valid;
    }

    init(): void {
        // shut up eslint
    }
}

export default NumberArgument;
