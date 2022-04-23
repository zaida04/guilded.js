import type { ChatMessagePayload, TeamMemberBanPayload, TeamMemberPayload, TeamMemberRoleIdsPayload } from "../structs";
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
    TeamMemberBanned: "TeamMemberBanned",
    TeamMemberUnbanned: "TeamMemberUnbanned",
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
        user: {
            id: string;
            botId: string;
            name: string;
            createdAt: string;
            createdBy: string;
        };
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
            serverId: string;
            isPrivate: boolean;
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
        isKick: boolean;
        isBan: boolean;
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

export interface WSTeamMemberBannedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        serverMemberBan: TeamMemberBanPayload;
    };
    t: WSEvent["TeamMemberBanned"];
}

export interface WSTeamMemberUnbannedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        serverMemberBan: TeamMemberBanPayload;
    };
    t: WSEvent["TeamMemberUnbanned"];
}

export interface WSTeamRolesUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        memberRoleIds: TeamMemberRoleIdsPayload[];
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
