import type { WSTeamRolesUpdatedPayload } from "@guildedjs/guilded-api-typings";
import GatewayEventHandler from "./GatewayEventHandler";

export default class TeamEventHandler extends GatewayEventHandler {
    teamRolesUpdated(data: WSTeamRolesUpdatedPayload): boolean {
		return false
	}
}
