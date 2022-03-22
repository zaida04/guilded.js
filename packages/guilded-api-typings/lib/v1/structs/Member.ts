import type { UserPayload, UserSummary } from "./User";

export interface TeamMemberPayload {
    user: UserPayload;
    roleIds: number[];
    nickname?: string;
    joinedAt: string;
}

export interface TeamMemberSummary {
    user: UserSummary;
    roleIds: number[];
}
