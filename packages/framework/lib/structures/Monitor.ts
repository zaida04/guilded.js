import Message from "guilded.js/types/structures/Message";
import BotClient from "../BotClient";

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

    async execute(message: Message) {
        // Placeholder for the execution handler for this task.
    }

    async init() {
        // Placeholder for anything you would like to run when this task is first created.
        // For example, making sure some tables exist in the database.
    }
}
