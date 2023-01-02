import type { ServerMemberBanPayload, ServerMemberPayload, ServerMemberRoleIdsPayload, ServerPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export type WSServerMemberJoinedPayload = SkeletonWSPayload & {
    d: {
        member: ServerMemberPayload;
        serverId: string;
    };
    t: WSEvent["ServerMemberJoined"];
}

export type WSServerMemberRemovedPayload = SkeletonWSPayload & {
    d: {
        isBan: boolean;
        isKick: boolean;
        serverId: string;
        userId: string;
    };
    t: WSEvent["ServerMemberRemoved"];
}

export type WSServerMemberUpdatedPayload = SkeletonWSPayload & {
    d: {
        serverId: string;
        userInfo: {
            id: string;
            nickname: string;
        };
    };
    t: WSEvent["ServerMemberUpdated"];
}

export type WSServerMemberBannedPayload = SkeletonWSPayload & {
    d: {
        serverId: string;
        serverMemberBan: ServerMemberBanPayload;
    };
    t: WSEvent["ServerMemberBanned"];
}

export type WSServerMemberUnbannedPayload = SkeletonWSPayload & {
    d: {
        serverId: string;
        serverMemberBan: ServerMemberBanPayload;
    };
    t: WSEvent["ServerMemberUnbanned"];
}

export type WSServerRolesUpdatedPayload = SkeletonWSPayload & {
    d: {
        memberRoleIds: ServerMemberRoleIdsPayload[];
        serverId: string;
    };
    t: WSEvent["ServerRolesUpdated"];
}

export type WSBotServerMembershipCreated = SkeletonWSPayload & {
    d: {
        createdBy: string;
        server: ServerPayload;
    };
    t: WSEvent["BotServerMembershipCreated"];
}
