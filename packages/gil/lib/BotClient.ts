import Collection from "@discordjs/collection";
import { bgBlue, bgGreen, bgYellow, black } from "colorette";
import { Client, Message } from "guilded.js";
import path from "path";

import type { Argument } from "./structures/Argument";
import type { Command } from "./structures/Command";
import type { Inhibitor } from "./structures/Inhibitor";
import type { Monitor } from "./structures/Monitor";
import type Task from "./structures/Task";
import { walk } from "./utils/walk";

export class BotClient extends Client {
    /** All your bot's monitors will be available here */
    monitors = new Collection<string, Monitor>();
    /** All your bot's commands will be available here */
    commands = new Collection<string, Command>();
    /** All your bot's arguments will be available here */
    arguments = new Collection<string, Argument>();
    /** All your bot's inhibitors will be available here */
    inhibitors = new Collection<string, Inhibitor>();
    /** All your bot's tasks will be available here */
    tasks = new Collection<string, Task>();
    /** The bot's prefixes per team. <teamId, prefix> */
    prefixes = new Map<string, string>();
    /** The message collectors that are pending. */
    messageCollectors = new Collection<string, MessageCollector>();
    /** The path that the end users commands,monitors, inhibitors and others will be located. */
    sourceFolderPath = this.options.sourceFolderPath || path.join(process.cwd(), "src/");

    constructor(public options: BotClientOptions, autoInit = true) {
        super(options);
        if (autoInit) void this.init();
    }

    /** Get the default client prefix. */
    get prefix(): string {
        return this.options.prefix;
    }

    /** Get the bot's mention. Guilded api does not provide a way to dynamically detect this so for now its manual. */
    get botMention(): string | undefined {
        return this.options.botMention;
    }

    async loadFile(result: any, dir: string, collection: Collection<string, any>): Promise<void> {
        const [filename, file] = result;
        const { name } = path.parse(filename);
        const piece = file.default ? new file.default(this, name) : new file(this, name);

        let cmd: Command | undefined = undefined;
        if (dir === "commands" && piece.parentCommand) {
            const subcommandNames = piece.parentCommand.split("-");
            for (const subname of subcommandNames) {
                // LOOK FOR MAIN COMMAND
                if (!cmd) {
                    const mainCmd = collection.get(subname);
                    if (mainCmd) {
                        cmd = mainCmd as Command;
                        continue;
                    } else {
                        throw new Error(
                            `You tried to create a subcommand named ${piece.name}. However, the parent command, ${subname}, was not found.`,
                        );
                    }
                }

                const subcmd = cmd?.subcommands?.get(subname) as Command;
                if (subcmd) {
                    cmd = subcmd;
                    continue;
                } else {
                    throw new Error(
                        `You tried to create a subcommand named ${piece.name} inside the main command ${cmd.name}. However, the parent command, ${subname}, was not found.`,
                    );
                }
            }
        }

        if (cmd) {
            if (!cmd.subcommands) cmd.subcommands = new Collection();
            cmd.subcommands.set(piece.name || name, piece);
        } else {
            collection.set(piece.name || name, piece);
        }

        if (piece.init) await piece.init();
    }

    /** Prepares the bot to run. Ideally used for loading files to the bot. */
    async init(): Promise<void> {
        await Promise.allSettled(
            [
                ["monitors", this.monitors] as const,
                ["commands", this.commands] as const,
                ["arguments", this.arguments] as const,
                ["inhibitors", this.inhibitors] as const,
                ["tasks", this.tasks] as const,
            ].map(async ([dir, collection]) => {
                try {
                    for await (const result of walk(path.join(__dirname, dir))) {
                        await this.loadFile(result, dir, collection);
                    }
                } catch (error) {
                    console.log(error);
                }
            }),
        ).catch(() => null);

        // Load all end user files
        await Promise.allSettled(
            [
                ["monitors", this.monitors] as const,
                ["commands", this.commands] as const,
                ["arguments", this.arguments] as const,
                ["inhibitors", this.inhibitors] as const,
                ["tasks", this.tasks] as const,
            ].map(async ([dir, collection]) => {
                try {
                    for await (const result of walk(this.options.monitorDirPath ?? path.join(this.sourceFolderPath, dir))) {
                        await this.loadFile(result, dir, collection);
                    }
                } catch (error) {
                    console.log(error);
                }
            }),
        ).catch(() => null);

        this.initializeMessageListener();
        this.initializeTasks();
    }

    /** Allows users to override and customize the addition of a event listener */
    initializeMessageListener(): void {
        this.on("messageCreated", (message) => this.processMonitors(message));
    }

    /** Allows users to override and customize the initialization of scheduled task intervals. */
    initializeTasks(): void {
        this.tasks.forEach(async (task) => {
            // TASKS THAT NEED TO RUN IMMEDIATELY ARE EXECUTED FIRST
            if (task.runOnStartup) await task.execute();

            // SET TIMEOUT WILL DETERMINE THE RIGHT TIME TO RUN THE TASK FIRST TIME AFTER STARTUP
            setTimeout(async () => {
                console.log(`${bgBlue(`[${this.getTime()}]`)} [TASK: ${bgYellow(black(task.name))}] started.`);
                try {
                    const started = Date.now();
                    await task.execute();
                    console.log(
                        `${bgBlue(`[${this.getTime()}]`)} [TASK: ${bgGreen(black(task.name))}] executed in ${this.humanizeMilliseconds(
                            Date.now() - started,
                        )}.`,
                    );
                } catch (error) {
                    console.log(error);
                }

                setInterval(async () => {
                    // IF TASKS REQUIRE BOT BEING FULLY READY EXIT OUT THIS INTERVAL IF BOT ISN'T READY
                    if (task.requireFullyReady && !this.readyTimestamp) return;

                    console.log(`${bgBlue(`[${this.getTime()}]`)} [TASK: ${bgYellow(black(task.name))}] started.`);
                    try {
                        const started = Date.now();
                        await task.execute();
                        console.log(
                            `${bgBlue(`[${this.getTime()}]`)} [TASK: ${bgGreen(black(task.name))}] executed in ${this.humanizeMilliseconds(
                                Date.now() - started,
                            )}.`,
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }, task.millisecondsInterval);
            }, Date.now() % task.millisecondsInterval);
        });
    }

    /** Handler that is run on messages and can  */
    processMonitors(message: Message): void {
        this.monitors.forEach((monitor) => {
            if (monitor.ignoreBots && (message.createdByBotId || message.createdByWebhookId)) return;
            if (monitor.ignoreOthers && message.createdByBotId !== this.user?.botId) return;
            if (monitor.ignoreEdits && message.updatedAt && message.updatedAt !== message.createdAt) return;
            // TODO: When the api supports using dm channels
            // if (monitor.ignoreDM && !message.teamId) return;
            void monitor.execute(message);
        });
    }

    humanizeMilliseconds(milliseconds: number): string {
        // Gets ms into seconds
        const time = milliseconds / 1000;
        if (time < 1) return "1s";

        const days = Math.floor(time / 86400);
        const hours = Math.floor((time % 86400) / 3600);
        const minutes = Math.floor(((time % 86400) % 3600) / 60);
        const seconds = Math.floor(((time % 86400) % 3600) % 60);

        const dayString = days ? `${days}d ` : "";
        const hourString = hours ? `${hours}h ` : "";
        const minuteString = minutes ? `${minutes}m ` : "";
        const secondString = seconds ? `${seconds}s ` : "";

        return `${dayString}${hourString}${minuteString}${secondString}`;
    }

    stringToMilliseconds(text: string): number | undefined {
        const matches = text.match(/(\d+[w|d|h|m|s]{1})/g);
        if (!matches) return;

        let total = 0;

        for (const match of matches) {
            // Finds the first of these letters
            const validMatch = /(w|d|h|m|s)/.exec(match);
            // if none of them were found cancel
            if (!validMatch) return;
            // Get the number which should be before the index of that match
            const number = match.substring(0, validMatch.index);
            // Get the letter that was found
            const [letter] = validMatch;
            if (!number || !letter) return;

            let multiplier = 1000;
            switch (letter.toLowerCase()) {
                case `w`:
                    multiplier = 1000 * 60 * 60 * 24 * 7;
                    break;
                case `d`:
                    multiplier = 1000 * 60 * 60 * 24;
                    break;
                case `h`:
                    multiplier = 1000 * 60 * 60;
                    break;
                case `m`:
                    multiplier = 1000 * 60;
                    break;
            }

            const amount = number ? parseInt(number, 10) : undefined;
            if (!amount && amount !== 0) return;

            total += amount * multiplier;
        }

        return total;
    }

    async needMessage(userId: string, channelId: string, options?: MessageCollectorOptions & { amount?: 1 }): Promise<Message>;
    async needMessage(userId: string, channelId: string, options: MessageCollectorOptions & { amount?: number }): Promise<Message[]>;
    async needMessage(userId: string, channelId: string, options?: MessageCollectorOptions): Promise<Message | Message[]> {
        const messages = await this.collectMessages({
            key: userId,
            channelId,
            createdAt: Date.now(),
            filter: options?.filter || ((msg): boolean => userId === msg.createdById),
            amount: options?.amount || 1,
            // DEFAULTS TO 5 MINUTES
            duration: options?.duration || 300000,
        });

        return (options?.amount || 1) > 1 ? messages : messages[0];
    }

    collectMessages(options: CollectMessagesOptions): Promise<Message[]> {
        return new Promise((resolve, reject) => {
            this.messageCollectors.get(options.key)?.reject("A new collector began before the user responded to the previous one.");

            this.messageCollectors.set(options.key, {
                ...options,
                messages: [],
                resolve,
                reject,
            });
        });
    }

    getTime(): string {
        const now = new Date();
        const hours = now.getHours();
        const minute = now.getMinutes();

        let hour = hours;
        let amOrPm = `AM`;
        if (hour > 12) {
            amOrPm = `PM`;
            hour -= 12;
        }

        return `${hour >= 10 ? hour : `0${hour}`}:${minute >= 10 ? minute : `0${minute}`} ${amOrPm}`;
    }
}

// export interface BotClientOptions extends ClientOptions {
export interface BotClientOptions {
    /** The prefix that will be used to determine if a message is executing a command. */
    prefix: string;
    /** The path that the end users commands, monitors, inhibitors and others will be located. */
    sourceFolderPath?: string;
    /** The path to a custom dir where commands are located. */
    commandDirPath?: string;
    /** The path to a custom dir where the monitors are located */
    monitorDirPath?: string;
    /** The path to a custom dir where the inhibitors are located */
    inhibitorDirPath?: string;
    /** The bot mention. Most likely @botname This is required as Guilded does not currently give any way to dynamically detect the mention. */
    botMention?: string;
    // TODO: THESE ARE REMOVED WHEN EXTENDS IS fixed
    token: string;
}

export interface MessageCollectorOptions {
    /** Function that will filter messages to determine whether to collect this message. Defaults to making sure the message is sent by the same member. */
    filter?: (message: Message) => boolean;
    /** The amount of messages to collect before resolving. Defaults to 1 */
    amount?: number;
    /** The amount of milliseconds this should collect for before expiring. Defaults to 5 minutes. */
    duration?: number;
}

export interface CollectMessagesOptions {
    /** The unique key that will be used to get responses for this. Ideally, meant to be for member id. */
    key: string;
    /** The amount of messages to collect before resolving. */
    amount: number;
    /** The timestamp when this collector was created */
    createdAt: number;
    /** The duration in milliseconds how long this collector should last. */
    duration: number;
    /** The channel Id where this is listening to */
    channelId: string;
    /** Function that will filter messages to determine whether to collect this message */
    filter: (message: Message) => boolean;
}

export interface MessageCollector extends CollectMessagesOptions {
    resolve: (value: Message[] | PromiseLike<Message[]>) => void;
    reject: (reason?: any) => void;
    /** Where the messages are stored if the amount to collect is more than 1. */
    messages: Message[];
}

export default BotClient;
