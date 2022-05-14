import type { UserPayload, UserSummaryPayload } from "./User";

export interface TeamMemberPayload {
    user: UserPayload;
    roleIds: number[];
    nickname?: string;
    joinedAt: string;
    isOwner?: boolean;
}

export interface TeamMemberSummaryPayload {
    user: UserSummaryPayload;
    roleIds: number[];
}

export interface TeamMemberBanPayload {
    user: UserSummaryPayload;
    reason?: string;
    createdBy: string;
    createdAt: string;
}

export interface TeamMemberRoleIdsPayload {
    userId: string;
    roleIds: number[];
}
