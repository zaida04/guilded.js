import type { Client } from "../structures/Client";
import { MessageEventHandler } from "./handler/MessageEventHandler";
import { ServerEventHandler } from "./handler/ServerEventHandler";
import { ServerMemberEventHandler } from "./handler/ServerMemberEventHandler";
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
	WSServerChannelCreated,
	WSServerChannelDeleted,
	WSServerChannelUpdated,
	WSServerMemberBannedPayload,
	WSServerMemberJoinedPayload,
	WSServerMemberRemovedPayload,
	WSServerMemberUnbannedPayload,
	WSServerMemberUpdatedPayload,
	WSServerRolesUpdatedPayload,
	WSServerWebhookCreatedPayload,
	WSServerWebhookUpdatedPayload,
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
	WSBotServerMembershipCreated,
} from "@guildedjs/guilded-api-typings";
import { WebSocketEvents } from "@guildedjs/guilded-api-typings";
import { ServerWebhookEventHandler } from "./handler/ServerWebhookEventHandler";
import { ListEventHandler } from "./handler/ListEventHandler";
import { ServerChannelEventHandler } from "./handler/ServerChannelEventHandler";
import { DocEventHandler } from "./handler/DocEventHandler";
import { ReactionEventHandler } from "./handler/ReactionEventHandler";
import { CalendarEventHandler, CalendarEventRsvpHandler } from "./handler/CalendarEventHandler";
import { ForumEventHandler } from "./handler/ForumEventHandler";
import { BotEventHandler } from "./handler/BotEventHandler";

export class ClientGatewayHandler {
	calendarEventHandler = new CalendarEventHandler(this.client);
	calendarEventRsvpHandler = new CalendarEventRsvpHandler(this.client);
	messageHandler = new MessageEventHandler(this.client);
	ServerHandler = new ServerEventHandler(this.client);
	ServerMemberHandler = new ServerMemberEventHandler(this.client);
	ServerWebhookHandler = new ServerWebhookEventHandler(this.client);
	listHandler = new ListEventHandler(this.client);
	ServerChannelHandler = new ServerChannelEventHandler(this.client);
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
		[WebSocketEvents.ServerMemberJoined]: (data) => this.ServerMemberHandler.ServerMemberJoined(data as WSServerMemberJoinedPayload),
		[WebSocketEvents.ServerMemberRemoved]: (data) => this.ServerMemberHandler.ServerMemberRemoved(data as WSServerMemberRemovedPayload),
		[WebSocketEvents.ServerMemberUpdated]: (data) => this.ServerMemberHandler.ServerMemberUpdated(data as WSServerMemberUpdatedPayload),
		[WebSocketEvents.ServerRolesUpdated]: (data) => this.ServerHandler.ServerRolesUpdated(data as WSServerRolesUpdatedPayload),
		[WebSocketEvents.ServerMemberBanned]: (data) => this.ServerMemberHandler.ServerMemberBanned(data as WSServerMemberBannedPayload),
		[WebSocketEvents.ServerMemberUnbanned]: (data) => this.ServerMemberHandler.ServerMemberUnbanned(data as WSServerMemberUnbannedPayload),
		[WebSocketEvents.ServerWebhookCreated]: (data) => this.ServerWebhookHandler.ServerWebhookCreated(data as WSServerWebhookCreatedPayload),
		[WebSocketEvents.ServerWebhookUpdated]: (data) => this.ServerWebhookHandler.ServerWebhookUpdated(data as WSServerWebhookUpdatedPayload),
		[WebSocketEvents.BotServerMembershipCreated]: (data) => this.botHandler.botServerMembershipCreated(data as WSBotServerMembershipCreated),
		[WebSocketEvents.ListItemCompleted]: (data) => this.listHandler.listItemCompleted(data as WSListItemCompleted),
		[WebSocketEvents.ListItemUncompleted]: (data) => this.listHandler.listItemUncompleted(data as WSListItemUncompleted),
		[WebSocketEvents.ListItemCreated]: (data) => this.listHandler.listItemCreated(data as WSListItemCreated),
		[WebSocketEvents.ListItemUpdated]: (data) => this.listHandler.listItemUpdated(data as WSListItemUpdated),
		[WebSocketEvents.ListItemDeleted]: (data) => this.listHandler.listItemDeleted(data as WSListItemDeleted),
		[WebSocketEvents.DocCreated]: (data) => this.docHandler.docCreated(data as WSDocCreated),
		[WebSocketEvents.DocDeleted]: (data) => this.docHandler.docDeleted(data as WSDocDeleted),
		[WebSocketEvents.DocUpdated]: (data) => this.docHandler.docUpdated(data as WSDocUpdated),
		[WebSocketEvents.ServerChannelCreated]: (data) => this.ServerChannelHandler.ServerChannelCreated(data as WSServerChannelCreated),
		[WebSocketEvents.ServerChannelDeleted]: (data) => this.ServerChannelHandler.ServerChannelDeleted(data as WSServerChannelDeleted),
		[WebSocketEvents.ServerChannelUpdated]: (data) => this.ServerChannelHandler.ServerChannelUpdated(data as WSServerChannelUpdated),
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

	constructor(public readonly client: Client) { }
	handleWSMessage(event: keyof WSEvent, data: SkeletonWSPayload): void {
		this.eventToHandlerMap[event]?.(data) ?? this.client.emit("unknownGatewayEvent", data);
	}
}
