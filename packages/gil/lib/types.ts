import type { Member, Message } from "guilded.js";
import type { StoredServer } from "./adapters/db/DatabaseAdapter";
import type { Command } from "./structures/Command";

export type CommandCustomContextFn = (data: { server: StoredServer; message: Message }) => Promise<Record<string, unknown>>;
export type CommandErrorHandler = (error: Error, additionalDetails: { message: Message; member: Member; server: StoredServer; command: Command; error_id: string }) => void;
