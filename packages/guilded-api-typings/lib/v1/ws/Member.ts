import type { ServerPayload, TeamMemberBanPayload, TeamMemberPayload, TeamMemberRoleIdsPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSTeamMemberJoinedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        member: TeamMemberPayload;
    };
    t: WSEvent["ServerMemberJoined"];
}

export interface WSTeamMemberRemovedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        userId: string;
        isKick: boolean;
        isBan: boolean;
    };
    t: WSEvent["ServerMemberRemoved"];
}

export interface WSTeamMemberUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        userInfo: {
            id: string;
            nickname: string;
        };
    };
    t: WSEvent["ServerMemberUpdated"];
}

export interface WSTeamMemberBannedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        serverMemberBan: TeamMemberBanPayload;
    };
    t: WSEvent["ServerMemberBanned"];
}

export interface WSTeamMemberUnbannedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        serverMemberBan: TeamMemberBanPayload;
    };
    t: WSEvent["ServerMemberUnbanned"];
}

export interface WSTeamRolesUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        memberRoleIds: TeamMemberRoleIdsPayload[];
    };
    t: WSEvent["ServerRolesUpdated"];
}

export interface WSBotTeamMembershipCreated extends SkeletonWSPayload {
    d: {
        createdBy: string;
        server: ServerPayload;
    };
    t: WSEvent["BotServerMembershipCreated"];
}
