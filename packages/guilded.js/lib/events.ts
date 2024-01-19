import type { EmotePayload, UserSummaryPayload } from "@guildedjs/api";
import type { Member } from "./structures";

export type ServerEvent = {
	serverId: string;
};

export type MemberUnbannedEvent = ServerEvent & {
	createdAt: string;
	createdBy: string;
	reason?: string;
	user: UserSummaryPayload;
};

export type MemberRemovedEvent = ServerEvent & {
	isBan?: boolean;
	isKick?: boolean;
	userId: string;
};

export type MemberUpdatedEvent = ServerEvent & {
	userId: string;
	nickname: string | null;
	oldMember: Member | null;
};

export type MessageReactionDeletedEvent = ServerEvent & {
	channelId: string;
	createdBy: string;
	emote: EmotePayload;
	messageId: string;
};

export type MessageDeletedEvent = ServerEvent & {
	channelId: string;
	deletedAt: string;
	id: string;
	isPrivate?: boolean;
};
