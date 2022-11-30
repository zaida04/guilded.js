import type { Message } from "guilded.js";
import type { BotClient } from "../BotClient";
import type { Command, CommandArgument } from "./Command";

export abstract class Argument {
    constructor(public readonly client: BotClient, public name: string) {}

    abstract execute(argument: CommandArgument, parameters: string[], message: Message, command: Command): Promise<unknown> | unknown;

    abstract init(): Promise<unknown> | unknown;
}

export default Argument;
