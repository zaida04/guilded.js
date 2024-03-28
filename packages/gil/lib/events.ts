import { Member, Message } from "guilded.js";
import { StoredServer } from "./adapters/db/DatabaseAdapter";
import { Command } from "./structures/Command";

export interface NonCommandMessageParams {
	message: Message;
	member: Member;
	server: StoredServer;
}

export interface CommandMessageParams {
	message: Message;
	member: Member;
	server: StoredServer;
	prefix: string;
}

export interface CommandRanParams {
	message: Message;
	member: Member;
	server: StoredServer;
	command: Command;
}

export type GilEvents = {
	nonCommandMessage(params: NonCommandMessageParams): unknown;
	commandMessage(params: CommandMessageParams): unknown;
	commandRan(params: CommandRanParams): unknown;
};
