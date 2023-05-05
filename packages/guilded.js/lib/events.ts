import { Schema } from "@guildedjs/guilded-api-typings";
import type { Member } from "./structures";

export interface ServerEvent {
	serverId: string;
}

export interface MemberUnbannedEvent extends ServerEvent {
	createdAt: string;
	createdBy: string;
	reason?: string;
	user: Schema<"UserSummary">;
}

export interface MemberRemovedEvent extends ServerEvent {
	isBan?: boolean;
	isKick?: boolean;
	userId: string;
}

export interface MemberUpdatedEvent extends ServerEvent {
	userId: string;
	nickname: string | null;
	oldMember: Member | null;
}

export interface MessageReactionDeletedEvent extends ServerEvent {
	channelId: string;
	createdBy: string;
	emote: Schema<"Emote">;
	messageId: string;
}

export interface MessageDeletedEvent extends ServerEvent {
	channelId: string;
	deletedAt: string;
	id: string;
	isPrivate?: boolean;
}
