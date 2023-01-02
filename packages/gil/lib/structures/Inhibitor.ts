import type { Message } from "guilded.js";
import type { BotClient } from "../BotClient";
import type { Command } from "./Command";

export abstract class Inhibitor {
    constructor(public readonly client: BotClient, public name: string) {}

    abstract execute(message: Message, command: Command): Promise<boolean> | boolean;

    abstract init(): Promise<unknown> | unknown;
}

export default Inhibitor;
