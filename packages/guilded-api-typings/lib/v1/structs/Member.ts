import type { UserPayload, UserSummaryPayload } from "./User";

export interface ServerMemberPayload {
    user: UserPayload;
    roleIds: number[];
    nickname?: string;
    joinedAt: string;
    isOwner?: boolean;
}

export interface ServerMemberSummaryPayload {
    user: UserSummaryPayload;
    roleIds: number[];
}

export interface ServerMemberBanPayload {
    user: UserSummaryPayload;
    reason?: string;
    createdBy: string;
    createdAt: string;
}

export interface ServerMemberRoleIdsPayload {
    userId: string;
    roleIds: number[];
}
