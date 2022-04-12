import { Argument } from "../structures/Argument";
import type { CommandArgument } from "../structures/Command";

export default class DurationArgument extends Argument {
    name = "duration";

    execute(argument: CommandArgument, parameters: string[]): number | undefined {
        const [time] = parameters;
        if (!time) return;

        return this.client.stringToMilliseconds(time);
    }

    init(): void {
        // shut up eslint
    }
}
