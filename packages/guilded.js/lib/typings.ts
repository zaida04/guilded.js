import type { TeamMemberBanPayload, TeamMemberPayload } from "@guildedjs/guilded-api-typings";

export interface BareStructureBaseData {
    id: string;
}

export type UpgradedTeamMemberPayload = TeamUpgradePayload<TeamMemberPayload> & { id: string }
export type UpgradedTeamMemberBanPayload = TeamUpgradePayload<TeamMemberBanPayload>;
export type TeamUpgradePayload<T> = T & { serverId: string }