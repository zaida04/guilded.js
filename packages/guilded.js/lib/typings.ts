import type {
	DocPayload,
	EmbedPayload,
	ListItemPayload,
	ListItemSummaryPayload,
	RESTPostChannelMessagesBody,
	ServerMemberBanPayload,
	ServerMemberPayload,
	ServerMemberRoleIdsPayload,
	ServerMemberSummaryPayload,
	WSChannelMessageReactionDeletedPayload,
	WSChatMessageDeletedPayload,
	WSServerMemberBannedPayload,
	WSServerMemberRemovedPayload,
	WSServerMemberUnbannedPayload,
	WSServerMemberUpdatedPayload,
} from "@guildedjs/guilded-api-typings";
import type { Channel, Embed, Member, MemberBan, Message, MessageReaction, User, Webhook } from "./structures";
import type { CalendarEvent, CalendarEventRsvp } from "./structures/CalendarEvent";
import type { ForumTopic } from "./structures/Forum";
import type { Server } from "./structures/Server";

export interface BareStructureBaseData {
	id: string;
}

export type UpgradedServerMemberPayload = IDUpgradePayload<ServerUpgradePayload<ServerMemberPayload>>;
export type UpgradedServerMemberBanPayload = ServerUpgradePayload<ServerMemberBanPayload>;
export type UpgradedServerMemberSummaryPayload = IDUpgradePayload<ServerUpgradePayload<ServerMemberSummaryPayload>>;

export type ServerUpgradePayload<T> = T & { serverId: string };
export type IDUpgradePayload<T> = T & { id: string };
export type MessageContent = (Omit<RESTPostChannelMessagesBody, "embeds"> & { embeds?: Embed[] | EmbedPayload[] }) | string | Embed;
export type MaybePromise<T> = T | Promise<T>;

export type ClientEvents = {
	ready: () => unknown;
	debug: (data: any) => unknown;
	exit: () => unknown;
	error: (reason: string, err: Error | null) => unknown;
	calendarEventCreated: (calendarEvent: CalendarEvent) => unknown;
	calendarEventUpdated: (calendarEvent: CalendarEvent, oldCalendar: CalendarEvent | null) => unknown;
	calendarEventDeleted: (calendarEvent: CalendarEvent) => unknown;
	calendarRsvpUpdated: (CalendarEventRsvp: CalendarEventRsvp, oldCalendarRsvp: CalendarEventRsvp | null) => unknown;
	calendarRsvpManyUpdated: (CalendarRsvpsEvent: Map<string, CalendarEventRsvp>) => unknown;
	calendarRsvpDeleted: (CalendarEventRsvp: CalendarEventRsvp) => unknown;
	messageCreated: (message: Message) => unknown;
	messageUpdated: (message: Message, oldMessage: Message | null) => unknown;
	messageDeleted: (message: Message | WSChatMessageDeletedPayload["d"]) => unknown;
	messageReactionCreated: (reaction: MessageReaction) => unknown;
	messageReactionDeleted: (reaction: MessageReaction | WSChannelMessageReactionDeletedPayload["d"]) => unknown;
	channelCreated: (channel: Channel) => unknown;
	channelUpdated: (channel: Channel, oldChannel: Channel | null) => unknown;
	channelDeleted: (channel: Channel) => unknown;
	docCreated: (doc: DocPayload) => unknown;
	docUpdated: (newDoc: DocPayload, oldDoc: DocPayload | null) => unknown;
	docDeleted: (doc: DocPayload) => unknown;
	listItemCreated: (item: ListItemPayload) => unknown;
	listItemUpdated: (newItem: ListItemPayload, oldItem: ListItemPayload | ListItemSummaryPayload | null) => unknown;
	listItemDeleted: (item: ListItemPayload) => unknown;
	listItemCompleted: (item: ListItemPayload) => unknown;
	listItemUncompleted: (item: ListItemPayload) => unknown;
	memberJoined: (member: Member) => unknown;
	memberRemoved: (member: Member | WSServerMemberRemovedPayload["d"]) => unknown;
	memberUpdated: (member: Member | WSServerMemberUpdatedPayload["d"], oldMember: Member | null) => unknown;
	memberBanned: (member: MemberBan | WSServerMemberBannedPayload["d"]) => unknown;
	memberUnbanned: (member: MemberBan | WSServerMemberUnbannedPayload["d"]) => unknown;
	botServerCreated: (server: Server, user: User | string) => unknown;
	forumTopicCreated: (topic: ForumTopic) => unknown;
	forumTopicUpdated: (topic: ForumTopic, oldTopic: ForumTopic | null) => unknown;
	forumTopicDeleted: (topic: ForumTopic) => unknown;
	forumTopicPinned: (topic: ForumTopic) => unknown;
	forumTopicUnpinned: (topic: ForumTopic) => unknown;
	forumTopicLocked: (topic: ForumTopic) => unknown;
	forumTopicUnlocked: (topic: ForumTopic) => unknown;
	serverCreated: (server: { serverId: string }) => unknown;
	webhookCreated: (webhook: Webhook) => unknown;
	webhookUpdated: (webhook: Webhook, oldWebhook: Webhook | null) => unknown;
	rolesUpdated: (members: (Member | (ServerMemberRoleIdsPayload & { serverId: string }))[], oldMembers: Member[]) => unknown;
	unknownGatewayEvent: (data: any) => unknown;
};
