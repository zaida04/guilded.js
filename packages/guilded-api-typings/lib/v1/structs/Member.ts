import type { UserPayload, UserSummaryPayload } from "./User";

export interface TeamMemberPayload {
    user: UserPayload;
    roleIds: number[];
    nickname?: string;
    joinedAt: string;
}

export interface TeamMemberSummaryPayload {
    user: UserSummaryPayload;
    roleIds: number[];
}
