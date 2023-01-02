import type { UserPayload, UserSummaryPayload } from "./User";

export type ServerMemberPayload = {
    isOwner?: boolean;
    joinedAt: string;
    nickname?: string;
    roleIds: number[];
    user: UserPayload;
}

export type ServerMemberSummaryPayload = {
    roleIds: number[];
    user: UserSummaryPayload;
}

export type ServerMemberBanPayload = {
    createdAt: string;
    createdBy: string;
    reason?: string;
    user: UserSummaryPayload;
}

export type ServerMemberRoleIdsPayload = {
    roleIds: number[];
    userId: string;
}
