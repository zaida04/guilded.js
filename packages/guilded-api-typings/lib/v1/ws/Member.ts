import type { ServerMemberBanPayload, ServerMemberPayload, ServerMemberRoleIdsPayload, ServerPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSServerMemberJoinedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        member: ServerMemberPayload;
    };
    t: WSEvent["ServerMemberJoined"];
}

export interface WSServerMemberRemovedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        userId: string;
        isKick: boolean;
        isBan: boolean;
    };
    t: WSEvent["ServerMemberRemoved"];
}

export interface WSServerMemberUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        userInfo: {
            id: string;
            nickname: string;
        };
    };
    t: WSEvent["ServerMemberUpdated"];
}

export interface WSServerMemberBannedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        serverMemberBan: ServerMemberBanPayload;
    };
    t: WSEvent["ServerMemberBanned"];
}

export interface WSServerMemberUnbannedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        serverMemberBan: ServerMemberBanPayload;
    };
    t: WSEvent["ServerMemberUnbanned"];
}

export interface WSServerRolesUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        memberRoleIds: ServerMemberRoleIdsPayload[];
    };
    t: WSEvent["ServerRolesUpdated"];
}

export interface WSBotServerMembershipCreated extends SkeletonWSPayload {
    d: {
        createdBy: string;
        server: ServerPayload;
    };
    t: WSEvent["BotServerMembershipCreated"];
}
