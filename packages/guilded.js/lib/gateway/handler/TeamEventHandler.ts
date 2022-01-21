import { WSChatMessageCreatedPayload, WSChatMessageDeletedPayload, WSChatMessageUpdatedPayload, WSTeamRolesUpdatedPayload } from "@guildedjs/guilded-api-typings";
import GatewayEventHandler from "./GatewayEventHandler";

export default class TeamEventHandler extends GatewayEventHandler {
    rolesUpdate(data: WSTeamRolesUpdatedPayload) {}
}