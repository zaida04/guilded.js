import { ChatMessagePayload } from "../structs/Message";

export enum WSOpCodes {
    SUCCESS,
    WELCOME,
    RESUME,
    ERROR = 8,
    PING = 9,
    PONG = 10,
}

export const WSEvents = {
    ChatMessageCreated: "ChatMessageCreated",
    ChatMessageUpdated: "ChatMessageUpdated",
    ChatMessageDeleted: "ChatMessageDeleted",
    TeamMemberUpdated: "TeamMemberUpdated",
    TeamRolesUpdated: "TeamRolesUpdated",
} as const;
type WSEvent = typeof WSEvents;

export interface SkeletonWSPayload {
    d: unknown;
    s?: string;
    op: WSOpCodes;
    t: keyof typeof WSEvents;
}

export interface WSWelcomePayload extends SkeletonWSPayload {
    d: {
        heartbeatIntervalMs: number;
        lastMessageId: string;
    };
}

export interface WSChatMessageCreatedPayload extends SkeletonWSPayload {
    d: {
        message: ChatMessagePayload;
    };
    t: WSEvent["ChatMessageCreated"];
}

export interface WSChatMessageUpdatedPayload extends SkeletonWSPayload {
    d: {
        message: ChatMessagePayload;
    };
    t: WSEvent["ChatMessageUpdated"];
}

export interface WSChatMessageDeletedPayload extends SkeletonWSPayload {
    d: {
        message: {
            id: string;
            channelId: string;
            deletedAt: string;
        };
    };
    t: WSEvent["ChatMessageDeleted"];
}

export interface WSTeamMemberUpdatedPayload extends SkeletonWSPayload {
    d: {
        userInfo: {
            id: string;
            nickname: string;
        };
    };
    t: WSEvent["TeamMemberUpdated"];
}

export interface WSTeamRolesUPdatedPayload extends SkeletonWSPayload {
    d: {
        memberRoleIds: unknown[];
    };
    t: WSEvent["TeamRolesUpdated"];
}
