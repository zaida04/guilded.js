import type { Collection } from "@discordjs/collection";
import type { Message } from "guilded.js";
import type { BotClient } from "../BotClient";

export abstract class Command {
    /**
     * The command aliases are stored here.
     */
    aliases?: string[];

    /**
     * The arguments you wish to request from the user.
     */
    arguments?: readonly CommandArgument[];

    /**
     * Where is this command allowed to run in? By default, it is allowed to run in a server only!
     */
    allowedIn?: ("dm" | "server")[] = ["server"];

    /**
     * The description of the command
     */
    description?: string;

    /**
     * The cooldown settings for this command.
     */
    cooldown?: {
        allowedUses?: number;
        seconds: number;
    };

    /**
     * The subcommands for this command.
     */
    subcommands?: Collection<string, Command>;

    /**
     * The name of the parent command. If nested subcommands, use `-` to separate the names. For example: `.settings staff modrole` would be parentCommand: "settings-staff"
     */
    parentCommand?: string;

    constructor(public readonly client: BotClient, public name: string) {}

    abstract execute(message: Message, args: Record<string, unknown>): Promise<unknown> | unknown;

    abstract init(): Promise<unknown> | unknown;

    get fullName(): string {
        return `${this.parentCommand ? `${this.parentCommand.split("-").join(" ")} ` : ""}${this.name}`;
    }
}

export type CommandArgument = {
    /**
     * If the type is a number, you can use this to allow/disable non-integers. By default this is false.
     */
    allowDecimals?: boolean;
    /**
     * The default value for this argument/subcommand.
     */
    defaultValue?: boolean | number | string;
    /**
     * If the type is string or subcommand you can provide literals. The argument MUST be exactly the same as the literals to be accepted. For example, you can list the subcommands here to make sure it matches.
     */
    literals?: string[];
    /**
     * If the type is string, this will force this argument to be lowercase.
     */
    lowercase?: boolean;
    /**
     * If the type is a number set the maximum amount. By default this is disabled.
     */
    maximum?: number;
    /**
     * If the type is number set the minimum amount. By default the minimum is 0
     */
    minimum?: number;
    /**
     * The function that runs if this argument is required and is missing.
     */
    missing?(message: Message): unknown;
    /**
     * The name of the argument. Useful for when you need to alert the user X arg is missing.
     */
    name: string;
    /**
     * Whether or not this argument is required. Defaults to true.
     */
    required?: boolean;
    /**
     * The type of the argument you would like. Defaults to string.
     */
    type?: "...string" | "boolean" | "duration" | "number" | "string" | "subcommand";
}

export default Command;
