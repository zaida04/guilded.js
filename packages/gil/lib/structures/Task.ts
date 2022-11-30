import type { BotClient } from "../BotClient";

export abstract class Task {
    /**
     * The amount of time this task should take to run. Defaults to 1 hour(3,600,000 ms)
     */
    millisecondsInterval = 60 * 60 * 1_000;

    /**
     * Whether or not this task should run immediately on startup. Default to false.
     */
    runOnStartup = false;

    /**
     * Whether this task requires the bot to be fully ready before running. Default to false.
     */
    requireReady = false;

    constructor(public readonly client: BotClient, public name: string) {}

    abstract execute(): Promise<unknown> | unknown;

    abstract init(): Promise<unknown> | unknown;
}

export default Task;
