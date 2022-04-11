import type { Message } from "../../../packages/guilded.js/types/index.js";

export interface Command {
    aliases: string[];
    execute: (msg: Message, args: string[]) => any;
    name: string;
}
