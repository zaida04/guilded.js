import { bgBlack, bgBlue, bgGreen, bgMagenta, bgYellow, black, green, red, white } from "colorette";
import type { Message } from "guilded.js";
import type { Command } from "../structures/Command";
import { Monitor } from "../structures/Monitor";

export class CommandsMonitor extends Monitor {
    // Commands should not ignore dms.
    ignoreDM = false;

    execute(message: Message): unknown {
        let prefix = this.parsePrefix(message.serverId);

        // If the message is not using the valid prefix or bot mention cancel the command
        // IF THE MESSAGE IS ONLY BOT MENTION, SEND THE PREFIX
        if (this.client.botMention) {
            if (this.client.botMention === message.content)
                return this.client.messages.send(message.channelId, { content: this.parsePrefix(message.serverId), replyMessageIds: [message.id] });
            // IF THE MESSAGE STARTS WITH BOT MENTION, USE MENTION AS PREFIX
            else if (message.content.startsWith(this.client.botMention)) prefix = this.client.botMention;
        }

        // IF NO PREFIX IS USED, CANCEL
        if (!message.content.startsWith(prefix)) return;

        // `!ping testing` becomes `ping`
        const [commandName, ...parameters] = message.content.slice(prefix.length).split(" ");

        // Check if this is a valid command
        const command = this.parseCommand(commandName);
        if (!command) return;

        this.logCommand(message, "Trigger", commandName);

        // TODO: implement a global user cooldown system

        void this.executeCommand(message, command, parameters);
    }

    parsePrefix(serverId?: string | null): string {
        const prefix = serverId ? this.client.prefixes.get(serverId) : this.client.prefix;
        return prefix ?? this.client.prefix;
    }

    parseCommand(commandName: string): Command | undefined {
        commandName = commandName.toLowerCase();
        const command = this.client.commands.get(commandName);
        if (command) return command;

        // Check aliases if the command wasn't found
        return this.client.commands.find((cmd) => Boolean(cmd.aliases?.includes(commandName)));
    }

    logCommand(message: Message, type: "Failure" | "Inhibit" | "Missing" | "Slowmode" | "Success" | "Trigger", commandName: string): void {
        // TODO: use server name when available in api
        const serverName = message.serverId ?? "DM";

        const command = `[COMMAND: ${bgYellow(black(commandName ?? "Unknown"))} - ${bgBlack(
            ["Failure", "Slowmode", "Missing"].includes(type) ? red(type) : type === "Success" ? green(type) : white(type),
        )}]`;

        // TODO: use message author tag or name here
        const user = bgGreen(black(`${""}(${message.createdById})`));
        const guild = bgMagenta(black(`${serverName}${message.serverId ? `(${message.serverId})` : ""}`));

        console.log(`${bgBlue(`[${this.client.getTime()}]`)} ${command} by ${user} in ${guild} with Message ID: ${message.id}`);
    }

    async executeCommand(message: Message, command: Command, parameters: string[]): Promise<void> {
        try {
            // bot.slowmode.set(message.author.id, message.timestamp);

            // Parsed args and validated
            const args = await this.parseArguments(message, command, parameters);
            // Some arg that was required was missing and handled already
            if (!args) {
                this.logCommand(message, "Missing", command.name);
                return;
            }

            // If no subcommand execute the command
            const [argument] = command.arguments ?? [];
            const subcommand = argument ? (args[argument.name] as Command) : undefined;

            if (!argument || argument.type !== "subcommand" || !subcommand) {
                // Check subcommand permissions and options
                if (!(await this.commandAllowed(message, command)))
                    return;

                await command.execute?.(message, args);
                this.logCommand(message, "Success", command.parentCommand ? `${command.parentCommand}-${command.name}` : command.name);
                return;
            }

            // A subcommand was asked for in this command
            if ([subcommand.name, ...(subcommand.aliases ?? [])].includes(parameters[0])) {
                const subParameters = parameters.slice(1);
                void this.executeCommand(message, subcommand, subParameters);
            } else {
                void this.executeCommand(message, subcommand, parameters);
            }
        } catch (error) {
            console.error(error);
            this.logCommand(message, "Failure", command.name);
        }
    }

    async parseArguments(message: Message, command: Command, parameters: string[]): Promise<Record<string, unknown> | false> {
        const args: { [key: string]: unknown } = {};
        if (!command.arguments) return args;

        let missingRequiredArg = false;

        // Clone the parameters so we can modify it without editing original array
        const params = [...parameters];

        // Loop over each argument and validate
        for (const argument of command.arguments) {
            const resolver = this.client.arguments.get(argument.type ?? "string");
            if (!resolver) continue;

            const result = await resolver.execute(argument, params, message, command);
            if (result !== undefined) {
                // Assign the valid argument
                args[argument.name] = result;
                // This will use up all args so immediately exist the loop.
                if (argument.type && ["subcommands", "...strings", "...roles", "...emojis", "...snowflakes"].includes(argument.type)) {
                    break;
                }

                // Remove a param for the next argument
                params.shift();
                continue;
            }

            // Invalid arg provided.
            if (Object.hasOwn(argument, "defaultValue")) {
                args[argument.name] = argument.defaultValue;
            } else if (argument.required !== false) {
                if (argument.missing) {
                    missingRequiredArg = true;
                    argument.missing?.(message);
                    break;
                }

                // A REQUIRED ARG WAS MISSING TRY TO COLLECT IT
                // TODO: perm check before sending
                const question = await this.client.messages.send(message.channelId, {
                    content: `You were missing the **${argument.name}** argument which is required in that command. Please provide the **${
                        argument.type === "subcommand" ? command.subcommands?.map((sub) => sub.name).join(", ") ?? "subcommand" : argument.type
                    }** now.`,
                    replyMessageIds: [message.id],
                });
                if (question) {
                    const response = await this.client.needMessage(message.createdById, message.channelId);
                    if (response) {
                        const responseArg = await resolver.execute(argument, [response.content], message, command);
                        if (responseArg) {
                            args[argument.name] = responseArg;
                            params.shift();
                            // TODO: perm checks to delete message
                            await Promise.all([
                                this.client.messages.delete(message.channelId, message.id),
                                this.client.messages.delete(message.channelId, response.id),
                            ]);
                            continue;
                        }
                    }
                }

                missingRequiredArg = true;
                // @ts-expect-error fix this dumb error. TODO: idk why this is erroring
                argument.missing?.(message);
                break;
            }
        }

        // If an arg was missing then return false so we can error out as an object {} will always be truthy
        return missingRequiredArg ? false : args;
    }

    async commandAllowed(message: Message, command: Command): Promise<boolean> {
        const inhibitorResults = await Promise.all([...this.client.inhibitors.values()].map((inhibitor) => inhibitor.execute(message, command)));

        if (inhibitorResults.includes(true)) {
            this.logCommand(message, "Inhibit", command.name);
            return false;
        }

        return true;
    }

    init(): unknown {
        return void 0;
    }
}

export default CommandsMonitor;
