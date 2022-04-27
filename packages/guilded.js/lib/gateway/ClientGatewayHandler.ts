import type { Client } from "../structures/Client";
import { MessageEventHandler } from "./handler/MessageEventHandler";
import { TeamEventHandler } from "./handler/TeamEventHandler";
import { TeamMemberEventHandler } from "./handler/TeamMemberEventHandler";
import type {
    SkeletonWSPayload,
    WSChatMessageCreatedPayload,
    WSChatMessageDeletedPayload,
    WSChatMessageUpdatedPayload,
    WSEvent,
    WSListItemCompleted,
    WSListItemUncompleted,
    WSTeamMemberBannedPayload,
    WSTeamMemberJoinedPayload,
    WSTeamMemberRemovedPayload,
    WSTeamMemberUnbannedPayload,
    WSTeamMemberUpdatedPayload,
    WSTeamRolesUpdatedPayload,
    WSTeamWebhookCreatedPayload,
    WSTeamWebhookUpdatedPayload,
} from "@guildedjs/guilded-api-typings";
import { WebSocketEvents } from "@guildedjs/guilded-api-typings";
import { TeamWebhookEventHandler } from "./handler/TeamWebhookEventHandler";
import { ListEventHandler } from "./handler/ListEventHandler";

export class ClientGatewayHandler {
    messageHandler = new MessageEventHandler(this.client);
    teamHandler = new TeamEventHandler(this.client);
    teamMemberHandler = new TeamMemberEventHandler(this.client);
    teamWebhookHandler = new TeamWebhookEventHandler(this.client);
    listHandler = new ListEventHandler(this.client);

    readonly eventToHandlerMap: Record<keyof WSEvent, (data: SkeletonWSPayload) => boolean> = {
        [WebSocketEvents.ChatMessageCreated]: (data) => this.messageHandler.messageCreated(data as WSChatMessageCreatedPayload),
        [WebSocketEvents.ChatMessageDeleted]: (data) => this.messageHandler.messageDeleted(data as WSChatMessageDeletedPayload),
        [WebSocketEvents.ChatMessageUpdated]: (data) => this.messageHandler.messageUpdated(data as WSChatMessageUpdatedPayload),
        [WebSocketEvents.TeamMemberJoined]: (data) => this.teamMemberHandler.teamMemberJoined(data as WSTeamMemberJoinedPayload),
        [WebSocketEvents.TeamMemberRemoved]: (data) => this.teamMemberHandler.teamMemberRemoved(data as WSTeamMemberRemovedPayload),
        [WebSocketEvents.TeamMemberUpdated]: (data) => this.teamMemberHandler.teamMemberUpdated(data as WSTeamMemberUpdatedPayload),
        [WebSocketEvents.teamRolesUpdated]: (data) => this.teamHandler.teamRolesUpdated(data as WSTeamRolesUpdatedPayload),
        [WebSocketEvents.TeamMemberBanned]: (data) => this.teamMemberHandler.teamMemberBanned(data as WSTeamMemberBannedPayload),
        [WebSocketEvents.TeamMemberUnbanned]: (data) => this.teamMemberHandler.teamMemberUnbanned(data as WSTeamMemberUnbannedPayload),
        [WebSocketEvents.TeamWebhookCreated]: (data) => this.teamWebhookHandler.teamWebhookCreated(data as WSTeamWebhookCreatedPayload),
        [WebSocketEvents.TeamWebhookUpdated]: (data) => this.teamWebhookHandler.teamWebhookUpdated(data as WSTeamWebhookUpdatedPayload),
        [WebSocketEvents.ListItemCompleted]: (data) => this.listHandler.ListItemCompleted(data as WSListItemCompleted),
        [WebSocketEvents.ListItemUncompleted]: (data) => this.listHandler.ListItemUncompleted(data as WSListItemUncompleted),
    };

    constructor(public readonly client: Client) {}
    handleWSMessage(event: keyof WSEvent, data: SkeletonWSPayload): void {
        this.eventToHandlerMap[event]?.(data) ?? this.client.emit("unknownGatewayEvent", data);
    }
}
