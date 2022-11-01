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
    WSForumTopicUnpinned,
    WSForumTopicLocked,
    WSForumTopicUnlocked,
    WSBotTeamMembershipCreated,
} from "@guildedjs/guilded-api-typings";
import { WebSocketEvents } from "@guildedjs/guilded-api-typings";
import { TeamWebhookEventHandler } from "./handler/TeamWebhookEventHandler";
import { ListEventHandler } from "./handler/ListEventHandler";
import { TeamChannelEventHandler } from "./handler/TeamChannelEventHandler";
import { DocEventHandler } from "./handler/DocEventHandler";
import { ReactionEventHandler } from "./handler/ReactionEventHandler";
import { CalendarEventHandler, CalendarEventRsvpHandler } from "./handler/CalendarEventHandler";
import { ForumEventHandler } from "./handler/ForumEventHandler";
import { BotEventHandler } from "./handler/BotEventHandler";

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
    botHandler = new BotEventHandler(this.client);

    readonly eventToHandlerMap: Record<keyof WSEvent, (data: SkeletonWSPayload) => boolean> = {
        [WebSocketEvents.CalendarEventCreated]: (data) => this.calendarEventHandler.calendarEventCreated(data as WSCalendarEventCreated),
        [WebSocketEvents.CalendarEventDeleted]: (data) => this.calendarEventHandler.calendarEventDeleted(data as WSCalendarEventDeleted),
        [WebSocketEvents.CalendarEventUpdated]: (data) => this.calendarEventHandler.calendarEventUpdated(data as WSCalendarEventUpdated),
        [WebSocketEvents.CalendarEventRsvpUpdated]: (data) =>
            this.calendarEventRsvpHandler.calendarEventRsvpUpdated(data as WSCalendarEventRsvpUpdated),
        [WebSocketEvents.CalendarEventRsvpManyUpdated]: (data) =>
            this.calendarEventRsvpHandler.calendarEventRsvpManyUpdated(data as WSCalendarEventRsvpManyUpdated),
        [WebSocketEvents.CalendarEventRsvpDeleted]: (data) =>
            this.calendarEventRsvpHandler.calendarEventRsvpDeleted(data as WSCalendarEventRsvpDeleted),
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
        [WebSocketEvents.BotTeamMembershipCreated]: (data) => this.botHandler.botTeamMembershipCreated(data as WSBotTeamMembershipCreated),
        [WebSocketEvents.ListItemCompleted]: (data) => this.listHandler.listItemCompleted(data as WSListItemCompleted),
        [WebSocketEvents.ListItemUncompleted]: (data) => this.listHandler.listItemUncompleted(data as WSListItemUncompleted),
        [WebSocketEvents.ListItemCreated]: (data) => this.listHandler.listItemCreated(data as WSListItemCreated),
        [WebSocketEvents.ListItemUpdated]: (data) => this.listHandler.listItemUpdated(data as WSListItemUpdated),
        [WebSocketEvents.ListItemDeleted]: (data) => this.listHandler.listItemDeleted(data as WSListItemDeleted),
        [WebSocketEvents.DocCreated]: (data) => this.docHandler.docCreated(data as WSDocCreated),
        [WebSocketEvents.DocDeleted]: (data) => this.docHandler.docDeleted(data as WSDocDeleted),
        [WebSocketEvents.DocUpdated]: (data) => this.docHandler.docUpdated(data as WSDocUpdated),
        [WebSocketEvents.TeamChannelCreated]: (data) => this.teamChannelHandler.teamChannelCreated(data as WSTeamChannelCreated),
        [WebSocketEvents.TeamChannelDeleted]: (data) => this.teamChannelHandler.teamChannelDeleted(data as WSTeamChannelDeleted),
        [WebSocketEvents.TeamChannelUpdated]: (data) => this.teamChannelHandler.teamChannelUpdated(data as WSTeamChannelUpdated),
        [WebSocketEvents.ChannelMessageReactionCreated]: (data) =>
            this.reactionHandler.messageReactionCreated(data as WSChannelMessageReactionCreatedPayload),
        [WebSocketEvents.ChannelMessageReactionDeleted]: (data) =>
            this.reactionHandler.messageReactionDeleted(data as WSChannelMessageReactionDeletedPayload),
        [WebSocketEvents.ForumTopicCreated]: (data) => this.forumHandler.forumTopicCreated(data as WSForumTopicCreated),
        [WebSocketEvents.ForumTopicDeleted]: (data) => this.forumHandler.forumTopicDeleted(data as WSForumTopicDeleted),
        [WebSocketEvents.ForumTopicUpdated]: (data) => this.forumHandler.forumTopicUpdated(data as WSForumTopicUpdated),
        [WebSocketEvents.ForumTopicPinned]: (data) => this.forumHandler.forumTopicPinned(data as WSForumTopicPinned),
        [WebSocketEvents.ForumTopicUnpinned]: (data) => this.forumHandler.forumTopicUnpinned(data as WSForumTopicUnpinned),
        [WebSocketEvents.ForumTopicLocked]: (data) => this.forumHandler.forumTopicLocked(data as WSForumTopicLocked),
        [WebSocketEvents.ForumTopicUnlocked]: (data) => this.forumHandler.forumTopicUnlocked(data as WSForumTopicUnlocked),
    };

    constructor(public readonly client: Client) {}
    handleWSMessage(event: keyof WSEvent, data: SkeletonWSPayload): void {
        this.eventToHandlerMap[event]?.(data) ?? this.client.emit("unknownGatewayEvent", data);
    }
}
