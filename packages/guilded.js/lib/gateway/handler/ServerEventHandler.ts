import type { WSServerRolesUpdatedPayload } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { GatewayEventHandler } from "./GatewayEventHandler";
import { buildMemberKey } from "../../util";

export class ServerEventHandler extends GatewayEventHandler {
  serverRolesUpdated(data: WSServerRolesUpdatedPayload): boolean {
    const oldMembers = [];
    // update members cache
    for (const m of data.d.memberRoleIds) {
      const member = this.client.members.cache.get(
        buildMemberKey(data.d.serverId, m.userId)
      );
      if (member) {
        oldMembers.push(member._clone());
        member._update({ roleIds: m.roleIds });
      }
    }

    return this.client.emit(
      constants.clientEvents.ROLES_UPATED,
      { serverId: data.d.serverId, members: data.d.memberRoleIds },
      oldMembers
    );
  }
}
