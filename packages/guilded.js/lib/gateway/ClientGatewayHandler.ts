import type { Client } from "../structures/Client";
import { MessageEventHandler } from "./handler/MessageEventHandler";
import { TeamEventHandler } from "./handler/TeamEventHandler";
import { TeamMemberEventHandler } from "./handler/TeamMemberEventHandler";
import type {
    SkeletonWSPayload,
    WSChatMessageCreatedPayload,
    WSChatMessageDeletedPayload,
    WSChatMessageUpdatedPayload,
    WSDocCreated,
    WSDocDeleted,
    WSDocUpdated,
    WSEvent,
    WSListItemCompleted,
    WSListItemCreated,
    WSListItemDeleted,
    WSListItemUncompleted,
    WSListItemUpdated,
    WSTeamChannelCreated,
    WSTeamChannelDeleted,
    WSTeamChannelUpdated,
    WSTeamMemberBannedPayload,
    WSTeamMemberJoinedPayload,
    WSTeamMemberRemovedPayload,
    WSTeamMemberUnbannedPayload,
    WSTeamMemberUpdatedPayload,
    WSTeamRolesUpdatedPayload,
    WSTeamWebhookCreatedPayload,
    WSTeamWebhookUpdatedPayload,
    WSChannelMessageReactionCreatedPayload,
    WSChannelMessageReactionDeletedPayload,
    WSCalendarEventCreated,
    WSCalendarEventDeleted,
    WSCalendarEventUpdated,
    WSCalendarEventRsvpUpdated,
    WSCalendarEventRsvpManyUpdated,
    WSCalendarEventRsvpDeleted,
    WSForumTopicCreated,
    WSForumTopicDeleted,
    WSForumTopicUpdated,
    WSForumTopicPinned,
    WSForumTopicUnpinned
} from "@guildedjs/guilded-api-typings";
import { WebSocketEvents } from "@guildedjs/guilded-api-typings";
import { TeamWebhookEventHandler } from "./handler/TeamWebhookEventHandler";
import { ListEventHandler } from "./handler/ListEventHandler";
import { TeamChannelEventHandler } from "./handler/TeamChannelEventHandler";
import { DocEventHandler } from "./handler/DocEventHandler";
import { ReactionEventHandler } from "./handler/ReactionEventHandler";
import { CalendarEventHandler, CalendarEventRsvpHandler } from "./handler/CalendarEventHandler";
import { ForumEventHandler } from "./handler/ForumEventHandler";

export class ClientGatewayHandler {
    calendarEventHandler = new CalendarEventHandler(this.client);
    calendarEventRsvpHandler = new CalendarEventRsvpHandler(this.client);
    messageHandler = new MessageEventHandler(this.client);
    teamHandler = new TeamEventHandler(this.client);
    teamMemberHandler = new TeamMemberEventHandler(this.client);
    teamWebhookHandler = new TeamWebhookEventHandler(this.client);
    listHandler = new ListEventHandler(this.client);
    teamChannelHandler = new TeamChannelEventHandler(this.client);
    docHandler = new DocEventHandler(this.client);
    reactionHandler = new ReactionEventHandler(this.client);
    forumHandler = new ForumEventHandler(this.client);

    readonly eventToHandlerMap: Record<keyof WSEvent, (data: SkeletonWSPayload) => boolean> = {
        [WebSocketEvents.CalendarEventCreated]: (data) => this.calendarEventHandler.calendarEventCreated(data as WSCalendarEventCreated),
        [WebSocketEvents.CalendarEventDeleted]: (data) => this.calendarEventHandler.calendarEventDeleted(data as WSCalendarEventDeleted),
        [WebSocketEvents.CalendarEventUpdated]: (data) => this.calendarEventHandler.calendarEventUpdated(data as WSCalendarEventUpdated),
        [WebSocketEvents.CalendarEventRsvpUpdated]: (data) => this.calendarEventRsvpHandler.calendarEventRsvpUpdated(data as WSCalendarEventRsvpUpdated),
        [WebSocketEvents.CalendarEventRsvpManyUpdated]: (data) => this.calendarEventRsvpHandler.calendarEventRsvpManyUpdated(data as WSCalendarEventRsvpManyUpdated),
        [WebSocketEvents.CalendarEventRsvpDeleted]: (data) => this.calendarEventRsvpHandler.calendarEventRsvpDeleted(data as WSCalendarEventRsvpDeleted),
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
        [WebSocketEvents.ListItemCreated]: (data) => this.listHandler.ListItemCreated(data as WSListItemCreated),
        [WebSocketEvents.ListItemUpdated]: (data) => this.listHandler.ListItemUpdated(data as WSListItemUpdated),
        [WebSocketEvents.ListItemDeleted]: (data) => this.listHandler.ListItemDeleted(data as WSListItemDeleted),
        [WebSocketEvents.DocCreated]: (data) => this.docHandler.DocCreated(data as WSDocCreated),
        [WebSocketEvents.DocDeleted]: (data) => this.docHandler.DocDeleted(data as WSDocDeleted),
        [WebSocketEvents.DocUpdated]: (data) => this.docHandler.DocUpdated(data as WSDocUpdated),
        [WebSocketEvents.TeamChannelCreated]: (data) => this.teamChannelHandler.TeamChannelCreated(data as WSTeamChannelCreated),
        [WebSocketEvents.TeamChannelDeleted]: (data) => this.teamChannelHandler.TeamChannelDeleted(data as WSTeamChannelDeleted),
        [WebSocketEvents.TeamChannelUpdated]: (data) => this.teamChannelHandler.TeamChannelUpdated(data as WSTeamChannelUpdated),
        [WebSocketEvents.ChannelMessageReactionCreated]: (data) =>
            this.reactionHandler.messageReactionCreated(data as WSChannelMessageReactionCreatedPayload),
        [WebSocketEvents.ChannelMessageReactionDeleted]: (data) =>
            this.reactionHandler.messageReactionDeleted(data as WSChannelMessageReactionDeletedPayload),
        [WebSocketEvents.ForumTopicCreated]: (data) => 
            this.forumHandler.ForumTopicCreated(data as WSForumTopicCreated),
        [WebSocketEvents.ForumTopicDeleted]: (data) => 
            this.forumHandler.ForumTopicDeleted(data as WSForumTopicDeleted),
        [WebSocketEvents.ForumTopicUpdated]: (data) => 
            this.forumHandler.ForumTopicUpdated(data as WSForumTopicUpdated),
        [WebSocketEvents.ForumTopicPinned]: (data) => 
            this.forumHandler.ForumTopicPinned(data as WSForumTopicPinned),
        [WebSocketEvents.ForumTopicUnpinned]: (data) =>
            this.forumHandler.ForumTopicUnpinned(data as WSForumTopicUnpinned)
    };
 
    constructor(public readonly client: Client) {}
    handleWSMessage(event: keyof WSEvent, data: SkeletonWSPayload): void {
        this.eventToHandlerMap[event]?.(data) ?? this.client.emit("unknownGatewayEvent", data);
    }
}
