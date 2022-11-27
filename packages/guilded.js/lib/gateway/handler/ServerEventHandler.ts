import type { WSServerRolesUpdatedPayload } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { GatewayEventHandler } from "./GatewayEventHandler";
import { buildMemberKey } from "../../util";

export class ServerEventHandler extends GatewayEventHandler {
	ServerRolesUpdated(data: WSServerRolesUpdatedPayload): boolean {
		const newMembers = [];
		const oldMembers = [];
		for (const m of data.d.memberRoleIds) {
			const member = this.client.members.cache.get(buildMemberKey(data.d.serverId, m.userId));
			if (!member) {
				newMembers.push({ ...m, serverId: data.d.serverId });
				continue;
			}
			oldMembers.push(member._clone());
			newMembers.push(member._update({ roleIds: m.roleIds }));
		}
		return this.client.emit(constants.clientEvents.ROLES_UPATED, newMembers, oldMembers);
	}
}
