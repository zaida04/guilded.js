import { WSTeamMemberUpdatedPayload } from "@guildedjs/guilded-api-typings";
import GatewayEventHandler from "./GatewayEventHandler";

export default class TeamMemberEventHandler extends GatewayEventHandler {
    teamMemberUpdate(data: WSTeamMemberUpdatedPayload) {}
}