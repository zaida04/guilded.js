import { User, UserSummary } from "./User";

export interface TeamMemberPayload {
    user: User;
    roleIds: number[];
    nickname?: string;
    joinedAt: string;
}

export interface TeamMemberSummary {
    user: UserSummary;
    roleIds: number[];
}
