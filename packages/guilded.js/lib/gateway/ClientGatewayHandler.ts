import type { Client } from "../structures/Client";
import MessageEventHandler from "./handler/MessageEventHandler";
import TeamEventHandler from "./handler/TeamEventHandler";
import TeamMemberEventHandler from "./handler/TeamMemberEventHandler";
import {
    WSChatMessageCreatedPayload,
    WSChatMessageDeletedPayload,
    WSChatMessageUpdatedPayload,
    WSEvent,
    WSTeamMemberJoinedPayload,
    WSTeamMemberRemovedPayload,
    WSTeamMemberUpdatedPayload,
    WSTeamRolesUpdatedPayload,
} from "@guildedjs/guilded-api-typings";

export class ClientGatewayHandler {
    messageHandler = new MessageEventHandler(this.client);
    teamHandler = new TeamEventHandler(this.client);
    teamMemberHandler = new TeamMemberEventHandler(this.client);

    constructor(public readonly client: Client) {}
    handleWSMessage(event: keyof WSEvent, data: Record<string, any>) {
        switch (event) {
            case "ChatMessageCreated": {
                this.messageHandler.messageCreated(data as WSChatMessageCreatedPayload);
                break;
            }
            case "ChatMessageDeleted": {
                this.messageHandler.messageDeleted(data as WSChatMessageDeletedPayload);
                break;
            }
            case "ChatMessageUpdated": {
                this.messageHandler.messageUpdated(data as WSChatMessageUpdatedPayload);
                break;
            }
            case "TeamMemberJoined": {
                this.teamMemberHandler.teamMemberJoined(data as WSTeamMemberJoinedPayload);
                break;
            }
            case "TeamMemberRemoved": {
                this.teamMemberHandler.teamMemberRemoved(data as WSTeamMemberRemovedPayload);
                break;
            }
            case "TeamMemberUpdated": {
                this.teamMemberHandler.teamMemberUpdated(data as WSTeamMemberUpdatedPayload);
                break;
            }
            case "teamRolesUpdated": {
                this.teamHandler.teamRolesUpdated(data as WSTeamRolesUpdatedPayload);
                break;
            }
            default: {
                this.client.emit("unknownGatewayEvent", data);
            }
        }
    }
}
