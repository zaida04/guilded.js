import path from "path";
import Collection from "@discordjs/collection";
import { walk } from "./utils/walk";
import { Monitor } from "./Structures/Monitor";
import { Client } from "guilded.js";
import Message from "guilded.js/types/structures/Message";

export default class BotClient extends Client {
    /** The options used to configure the bot. */
    options: BotClientOptions;
    /** All your bot's monitors will be available here */
    monitors = new Collection<string, Monitor>();
    /** The bot's prefixes per team. <teamId, prefix> */
    prefixes = new Map<string, string>();
    /** The path that the end users commands,monitors, inhibitors and others will be located. */
    sourceFolderPath: string;

    constructor(options: BotClientOptions) {
        super(options);

        this.options = options;
        this.sourceFolderPath = options.sourceFolderPath || path.join(process.cwd(), "src/");

        void this.init();
    }

    /** Get the default client prefix. */
    get prefix() {
        return this.options.prefix;
    }

    /** Prepares the bot to run. Ideally used for loading files to the bot. */
    async init() {
        await Promise.allSettled(
            [["monitors", this.monitors] as const].map(async ([dir, collection]) => {
                try {
                    for await (const result of walk(path.join(__dirname, `./internal/${dir}/`))) {
                        if (!result) return;

                        const [filename, file] = result;
                        const name = filename.substring(0, filename.length - 2);
                        const piece = file.default ? new file.default(this, name) : new file(this, name);

                        collection.set(piece.name || name, piece);

                        if (piece.init) await piece.init();
                    }
                } catch (error) {
                    console.log(error);
                }
            }),
        ).catch(() => null);

        // Load all end user files
        await Promise.allSettled(
            [["monitors", this.monitors] as const].map(async ([dir, collection]) => {
                try {
                    for await (const result of walk(path.join(this.sourceFolderPath, dir))) {
                        if (!result) return;

                        const [filename, file] = result;
                        const name = filename.substring(0, filename.length - 2);
                        const piece = file.default ? new file.default(this, name) : new file(this, name);

                        collection.set(piece.name || name, piece);
                        if (piece.init) await piece.init();
                    }
                } catch (error) {
                    console.log(error);
                }
            }),
        ).catch(() => null);

        this.initializeMessageListener();
    }

    /** Allows users to override and customize the addition of a event listener */
    initializeMessageListener() {
        this.on("messageCreated", (message) => this.processMonitors(message));
    }

    /** Handler that is run on messages and can  */
    processMonitors(message: Message) {
        this.monitors.forEach((monitor) => {
            if (monitor.ignoreBots && message.createdByBotId) return;
            // @ts-ignore FIX THE ID PROPERTY FOR CLIENT.id
            if (monitor.ignoreOthers && message.createdBy !== this.id) return;
            if (monitor.ignoreEdits && message.updatedAt && message.updatedAt !== message.createdAt) return;
            // TODO: figure out how to detect dms
            // if (monitor.ignoreDM && !message.teamId) return;

            void monitor.execute(message);
        });
    }
}

// export interface BotClientOptions extends ClientOptions {
export interface BotClientOptions {
    /** The prefix that will be used to determine if a message is executing a command. */
    prefix: string;
    /** The path that the end users commands,monitors, inhibitors and others will be located. */
    sourceFolderPath?: string;

    // TODO: THESE ARE REMOVED WHEN EXTENDS IS fixed
    token: string;
}
