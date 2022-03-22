import { WSTeamMemberUpdatedPayload, WSTeamMemberJoinedPayload, WSTeamMemberRemovedPayload } from "@guildedjs/guilded-api-typings";
import GatewayEventHandler from "./GatewayEventHandler";

export default class TeamMemberEventHandler extends GatewayEventHandler {
    teamMemberUpdated(data: WSTeamMemberUpdatedPayload) {}
    teamMemberJoined(data: WSTeamMemberJoinedPayload) {
        return this.client.emit("memberJoined", data.d);
    }
    teamMemberRemoved(data: WSTeamMemberRemovedPayload) {
        return this.client.emit("memberRemoved", data.d);
    }
}
