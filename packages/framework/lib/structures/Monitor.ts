import type { Message } from "guilded.js";

import type BotClient from "../BotClient";

export class Monitor {
    /** The client itself */
    client: BotClient;
    /** The name of the task. */
    name: string;
    /** Whether this monitor should ignore messages that are sent by bots. By default this is true. */
    ignoreBots = true;
    /** Whether this monitor should ignore messages that are sent by others. By default this is false.*/
    ignoreOthers = false;
    /** Whether this monitor should ignore messages that are edited. By default this is false.*/
    ignoreEdits = false;
    /** Whether this monitor should ignore messages that are sent in DM. By default this is true. */
    ignoreDM = true;

    constructor(client: BotClient, name: string) {
        this.client = client;
        this.name = name;

        this.client.monitors.set(name, this);
    }

    execute(message: Message): Promise<unknown> | unknown {
        // Placeholder for the execution handler for this task.
        throw new Error(`[Monitor Error] The ${this.name} monitor execute function was not provided.`);
    }

    init(): Promise<void> | void {
        // Placeholder for anything you would like to run when this task is first created.
        // For example, making sure some tables exist in the database.
    }
}
