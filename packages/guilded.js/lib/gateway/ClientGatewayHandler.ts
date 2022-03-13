import type { Client } from "../Client";
import MessageEventHandler from "./handler/MessageEventHandler";
import TeamEventHandler from "./handler/TeamEventHandler";
import TeamMemberEventHandler from "./handler/TeamMemberEventHandler";
import WebSocketManager from "@guildedjs/ws/types/WebSocketManager";
import {
    WSChatMessageCreatedPayload,
    WSChatMessageDeletedPayload,
    WSChatMessageUpdatedPayload,
    WSTeamMemberUpdatedPayload,
    WSTeamRolesUpdatedPayload,
} from "@guildedjs/guilded-api-typings";

export class ClientGatewayHandler {
    readonly messageHandler = new MessageEventHandler(this.client);
    readonly teamHandler = new TeamEventHandler(this.client);
    readonly teamMemberHandler = new TeamMemberEventHandler(this.client);
    wsManager?: WebSocketManager;

    constructor(public readonly client: Client) {}
    connect(options: WebSocketManager["options"]) {
        this.wsManager = new WebSocketManager(options);
        this.wsManager.emitter
            .on("gatewayEvent", (event, data) => {
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
            })
            .on("ready", () => this.client.emit("ready"))
            .on("exit", () => this.client.emit("exit"));
    }
}
