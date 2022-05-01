import type { TeamMemberBanPayload, TeamMemberPayload, TeamMemberRoleIdsPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

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
