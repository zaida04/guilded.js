import type { WSTeamRolesUpdatedPayload } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class TeamEventHandler extends GatewayEventHandler {
    teamRolesUpdated(data: WSTeamRolesUpdatedPayload): boolean {
        const newMembers = [];
        const oldMembers = [];
        for (const m of data.d.memberRoleIds) {
            const member = this.client.members.cache.get(`${data.d.serverId}:${m.userId}`);
            if (!member) {
                newMembers.push(m);
                continue;
            }
            oldMembers.push(member._clone());
            newMembers.push(member._update({ roleIds: m.roleIds }));
        }
        return this.client.emit(constants.clientEvents.TEAM_ROLES_UPATED, data.d.serverId, newMembers, oldMembers)
    }
}
