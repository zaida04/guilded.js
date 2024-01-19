import type { SkeletonWSPayload, WSEvent, WSPacket } from "@guildedjs/api";
import { WebSocketEvents } from "@guildedjs/api";
import type { Client } from "../structures/Client";
import { BotEventHandler } from "./handler/BotEventHandler";
import { CalendarEventHandler, CalendarEventRsvpHandler } from "./handler/CalendarEventHandler";
import { DocEventHandler } from "./handler/DocEventHandler";
import { ForumEventHandler } from "./handler/ForumEventHandler";
import { ListEventHandler } from "./handler/ListEventHandler";
import { MessageEventHandler } from "./handler/MessageEventHandler";
import { ReactionEventHandler } from "./handler/ReactionEventHandler";
import { ServerChannelEventHandler } from "./handler/ServerChannelEventHandler";
import { ServerEventHandler } from "./handler/ServerEventHandler";
import { ServerMemberEventHandler } from "./handler/ServerMemberEventHandler";
import { ServerWebhookEventHandler } from "./handler/ServerWebhookEventHandler";

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

	readonly eventToHandlerMap: Record<keyof WSEvent, (data: SkeletonWSPayload) => Promise<boolean> | boolean> = {
		[WebSocketEvents.CalendarEventCreated]: (data) => this.calendarEventHandler.calendarEventCreated(data as WSPacket<"CalendarEventCreated">),
		[WebSocketEvents.CalendarEventDeleted]: (data) => this.calendarEventHandler.calendarEventDeleted(data as WSPacket<"CalendarEventDeleted">),
		[WebSocketEvents.CalendarEventUpdated]: (data) => this.calendarEventHandler.calendarEventUpdated(data as WSPacket<"CalendarEventUpdated">),
		[WebSocketEvents.CalendarEventRsvpUpdated]: (data) => this.calendarEventRsvpHandler.calendarEventRsvpUpdated(data as WSPacket<"CalendarEventRsvpUpdated">),
		[WebSocketEvents.CalendarEventRsvpManyUpdated]: (data) => this.calendarEventRsvpHandler.calendarEventRsvpManyUpdated(data as WSPacket<"CalendarEventRsvpManyUpdated">),
		[WebSocketEvents.CalendarEventRsvpDeleted]: (data) => this.calendarEventRsvpHandler.calendarEventRsvpDeleted(data as WSPacket<"CalendarEventRsvpDeleted">),
		[WebSocketEvents.ChatMessageCreated]: (data) => this.messageHandler.messageCreated(data as WSPacket<"ChatMessageCreated">),
		[WebSocketEvents.ChatMessageDeleted]: (data) => this.messageHandler.messageDeleted(data as WSPacket<"ChatMessageDeleted">),
		[WebSocketEvents.ChatMessageUpdated]: (data) => this.messageHandler.messageUpdated(data as WSPacket<"ChatMessageUpdated">),
		[WebSocketEvents.ServerMemberJoined]: (data) => this.ServerMemberHandler.serverMemberJoined(data as WSPacket<"ServerMemberJoined">),
		[WebSocketEvents.ServerMemberRemoved]: (data) => this.ServerMemberHandler.serverMemberRemoved(data as WSPacket<"ServerMemberRemoved">),
		[WebSocketEvents.ServerMemberUpdated]: (data) => this.ServerMemberHandler.serverMemberUpdated(data as WSPacket<"ServerMemberUpdated">),
		[WebSocketEvents.ServerRolesUpdated]: (data) => this.ServerHandler.serverRolesUpdated(data as WSPacket<"ServerRolesUpdated">),
		[WebSocketEvents.ServerMemberBanned]: (data) => this.ServerMemberHandler.serverMemberBanned(data as WSPacket<"ServerMemberBanned">),
		[WebSocketEvents.ServerMemberUnbanned]: (data) => this.ServerMemberHandler.serverMemberUnbanned(data as WSPacket<"ServerMemberUnbanned">),
		[WebSocketEvents.ServerMemberSocialLinkCreated]: (data) => this.ServerMemberHandler.serverMemberSocialLinkCreated(data as WSPacket<"ServerMemberSocialLinkCreated">),
		[WebSocketEvents.ServerMemberSocialLinkUpdated]: (data) => this.ServerMemberHandler.serverMemberSocialLinkUpdated(data as WSPacket<"ServerMemberSocialLinkUpdated">),
		[WebSocketEvents.ServerMemberSocialLinkDeleted]: (data) => this.ServerMemberHandler.serverMemberSocialLinkDeleted(data as WSPacket<"ServerMemberSocialLinkDeleted">),
		[WebSocketEvents.ServerWebhookCreated]: (data) => this.ServerWebhookHandler.serverWebhookCreated(data as WSPacket<"ServerWebhookCreated">),
		[WebSocketEvents.ServerWebhookUpdated]: (data) => this.ServerWebhookHandler.serverWebhookUpdated(data as WSPacket<"ServerWebhookUpdated">),
		[WebSocketEvents.BotServerMembershipCreated]: (data) => this.botHandler.botServerMembershipCreated(data as WSPacket<"BotServerMembershipCreated">),
		[WebSocketEvents.BotServerMembershipDeleted]: (data) => this.botHandler.botServerMembershipDeleted(data as WSPacket<"BotServerMembershipDeleted">),
		[WebSocketEvents.ListItemCompleted]: (data) => this.listHandler.listItemCompleted(data as WSPacket<"ListItemCompleted">),
		[WebSocketEvents.ListItemUncompleted]: (data) => this.listHandler.listItemUncompleted(data as WSPacket<"ListItemUncompleted">),
		[WebSocketEvents.ListItemCreated]: (data) => this.listHandler.listItemCreated(data as WSPacket<"ListItemCreated">),
		[WebSocketEvents.ListItemUpdated]: (data) => this.listHandler.listItemUpdated(data as WSPacket<"ListItemUpdated">),
		[WebSocketEvents.ListItemDeleted]: (data) => this.listHandler.listItemDeleted(data as WSPacket<"ListItemDeleted">),
		[WebSocketEvents.DocCreated]: (data) => this.docHandler.docCreated(data as WSPacket<"DocCreated">),
		[WebSocketEvents.DocDeleted]: (data) => this.docHandler.docDeleted(data as WSPacket<"DocDeleted">),
		[WebSocketEvents.DocUpdated]: (data) => this.docHandler.docUpdated(data as WSPacket<"DocUpdated">),
		[WebSocketEvents.ServerChannelCreated]: (data) => this.ServerChannelHandler.serverChannelCreated(data as WSPacket<"ServerChannelCreated">),
		[WebSocketEvents.ServerChannelDeleted]: (data) => this.ServerChannelHandler.serverChannelDeleted(data as WSPacket<"ServerChannelDeleted">),
		[WebSocketEvents.ServerChannelUpdated]: (data) => this.ServerChannelHandler.serverChannelUpdated(data as WSPacket<"ServerChannelUpdated">),
		[WebSocketEvents.ChannelMessageReactionCreated]: (data) => this.reactionHandler.messageReactionCreated(data as WSPacket<"ChannelMessageReactionCreated">),
		[WebSocketEvents.ChannelMessageReactionDeleted]: (data) => this.reactionHandler.messageReactionDeleted(data as WSPacket<"ChannelMessageReactionDeleted">),
		[WebSocketEvents.ForumTopicCreated]: (data) => this.forumHandler.forumTopicCreated(data as WSPacket<"ForumTopicCreated">),
		[WebSocketEvents.ForumTopicDeleted]: (data) => this.forumHandler.forumTopicDeleted(data as WSPacket<"ForumTopicDeleted">),
		[WebSocketEvents.ForumTopicUpdated]: (data) => this.forumHandler.forumTopicUpdated(data as WSPacket<"ForumTopicUpdated">),
		[WebSocketEvents.ForumTopicPinned]: (data) => this.forumHandler.forumTopicPinned(data as WSPacket<"ForumTopicPinned">),
		[WebSocketEvents.ForumTopicUnpinned]: (data) => this.forumHandler.forumTopicUnpinned(data as WSPacket<"ForumTopicUnpinned">),
		[WebSocketEvents.ForumTopicLocked]: (data) => this.forumHandler.forumTopicLocked(data as WSPacket<"ForumTopicLocked">),
		[WebSocketEvents.ForumTopicUnlocked]: (data) => this.forumHandler.forumTopicUnlocked(data as WSPacket<"ForumTopicUnlocked">),
	};

	constructor(public readonly client: Client) {}

	handleWSMessage(event: keyof WSEvent, data: SkeletonWSPayload): void {
		const discardEventOption = this.client.options.gateway?.discardEvent;
		if (discardEventOption?.(event, data)) return;

		const existingEvent = this.eventToHandlerMap[event];
		if (existingEvent) {
			void existingEvent(data);
		} else {
			this.client.emit("unknownGatewayEvent", data);
		}
	}
}
