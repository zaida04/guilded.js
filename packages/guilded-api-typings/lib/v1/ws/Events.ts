import { ChatMessagePayload } from "../structs/Message";

export interface SkeletonWSPayload {
    d: unknown;
    s?: string;
    op: 0 | 1 | 2 | 8 | 9;
    t: string;
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
    t: "ChatMessageCreated";
}

export interface WSChatMessageUpdatedPayload extends SkeletonWSPayload {
    d: {
        message: ChatMessagePayload;
    };
    t: "ChatMessageUpdated";
}

export interface WSChatMessageDeletedPayload extends SkeletonWSPayload {
    d: {
        message: {
            id: string;
            channelId: string;
            deletedAt: string;
        };
    };
    t: "ChatMessageDeleted";
}

export interface WSTeamMemberUpdatedPayload extends SkeletonWSPayload {
    d: {
        userInfo: {
            id: string;
            nickname: string;
        };
    };
    t: "TeamMemberUpdated";
}

export interface WSTeamRolesUPdatedPayload extends SkeletonWSPayload {
    d: {
        memberRoleIds: unknown[];
    };
    t: "TeamRolesUpdated";
}
