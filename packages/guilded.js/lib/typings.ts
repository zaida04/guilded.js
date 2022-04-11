import type { TeamMemberBanPayload, TeamMemberPayload, TeamMemberSummaryPayload } from "@guildedjs/guilded-api-typings";

export interface BareStructureBaseData {
    id: string;
}

export type UpgradedTeamMemberPayload = IDUpgradePayload<TeamUpgradePayload<TeamMemberPayload>>;
export type UpgradedTeamMemberBanPayload = TeamUpgradePayload<TeamMemberBanPayload>;
export type UpgradedTeamMemberSummaryPayload = IDUpgradePayload<TeamUpgradePayload<TeamMemberSummaryPayload>>;

export type TeamUpgradePayload<T> = T & { serverId: string };
export type IDUpgradePayload<T> = T & { id: string };
