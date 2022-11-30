import type { Message } from "guilded.js";
import type { BotClient } from "../BotClient";

export abstract class Monitor {
    /**
     * Whether this monitor should ignore messages that are sent by bots. By default this is true.
     */
    ignoreBots = true;

    /**
     * Whether this monitor should ignore messages that are sent by others. By default this is false.
     */
    ignoreOthers = false;

    /**
     * Whether this monitor should ignore messages that are edited. By default this is false.
     */
    ignoreEdits = false;

    /**
     * Whether this monitor should ignore messages that are sent in DM. By default this is true.
     */
    ignoreDM = true;

    constructor(public readonly client: BotClient, public name: string) {}

    abstract execute(message: Message): Promise<unknown> | unknown;

    abstract init(): Promise<unknown> | unknown;
}

export default Monitor;
