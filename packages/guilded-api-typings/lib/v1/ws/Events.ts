import type { ChatMessagePayload, TeamMemberPayload } from "../structs";
import type { WebhookPayload } from "../structs/Webhook";

export enum WSOpCodes {
    SUCCESS,
    WELCOME,
    RESUME,
    ERROR = 8,
    PING,
    PONG,
}

export const WebSocketEvents = {
    ChatMessageCreated: "ChatMessageCreated",
    ChatMessageUpdated: "ChatMessageUpdated",
    ChatMessageDeleted: "ChatMessageDeleted",
    TeamMemberJoined: "TeamMemberJoined",
    TeamMemberRemoved: "TeamMemberRemoved",
    TeamMemberUpdated: "TeamMemberUpdated",
    // This is intentional. Legacy change on Guilded's end.
    teamRolesUpdated: "teamRolesUpdated",
    TeamWebhookCreated: "TeamWebhookCreated",
    TeamWebhookUpdated: "TeamWebhookUpdated",
} as const;
export type WSEvent = typeof WebSocketEvents;

export interface SkeletonWSPayload {
    d: unknown;
    s?: string;
    op: WSOpCodes;
    t: keyof WSEvent;
}

export interface WSWelcomePayload extends SkeletonWSPayload {
    d: {
        heartbeatIntervalMs: number;
        lastMessageId: string;
    };
}

export interface WSChatMessageCreatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        message: ChatMessagePayload;
    };
    t: WSEvent["ChatMessageCreated"];
}

export interface WSChatMessageUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        message: ChatMessagePayload;
    };
    t: WSEvent["ChatMessageUpdated"];
}

export interface WSChatMessageDeletedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        message: {
            id: string;
            channelId: string;
            deletedAt: string;
        };
    };
    t: WSEvent["ChatMessageDeleted"];
}

export interface WSTeamMemberJoinedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        member: TeamMemberPayload;
    };
    t: WSEvent["TeamMemberJoined"];
}

export interface WSTeamMemberRemovedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        userId: string;
    };
    t: WSEvent["TeamMemberRemoved"];
}

export interface WSTeamMemberUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        userInfo: {
            id: string;
            nickname: string;
        };
    };
    t: WSEvent["TeamMemberUpdated"];
}

export interface WSTeamRolesUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        memberRoleIds: unknown[];
    };
    t: WSEvent["teamRolesUpdated"];
}

export interface WSTeamWebhookCreatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        webhook: WebhookPayload;
    };
    t: WSEvent["TeamWebhookCreated"];
}

export interface WSTeamWebhookUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        webhook: WebhookPayload;
    };
    t: WSEvent["TeamWebhookUpdated"];
}
