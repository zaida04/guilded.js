import type { TeamMemberPayload } from "@guildedjs/guilded-api-typings";

export interface BareStructureBaseData {
    id: string;
}

export type UpgradedTeamMemberPayload = TeamMemberPayload & { serverId: string; id: string };
