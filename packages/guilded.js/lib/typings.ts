import type {
	DocPayload,
	EmbedPayload, ListItemPayload, ListItemSummaryPayload, ServerMemberBanPayload, ServerMemberPayload, ServerMemberSummaryPayload, SocialLinkPayload,
} from "@guildedjs/api";
import type {
	Channel,
	Embed,
	Member,
	MemberBan,
	Message,
	MessageReaction,
	Webhook,
} from "./structures";
import type {
	CalendarEvent,
	CalendarEventRsvp,
} from "./structures/CalendarEvent";
import type { ForumTopic } from "./structures/Forum";
import type { Server } from "./structures/Server";
import type {
	MemberRemovedEvent,
	MemberUnbannedEvent,
	MemberUpdatedEvent,
	MessageDeletedEvent,
	MessageReactionDeletedEvent,
} from "./events";
import type { Collection } from "@discordjs/collection";

export interface BareStructureBaseData {
	id: string;
}

export type OptionParam<T extends (...args: any[]) => any> = Parameters<T>[0]["requestBody"]
export type OptionQuery<T extends (...args: any[]) => any> = Parameters<T>[0]

export type UpgradedServerMemberPayload = IDUpgradePayload<
	ServerUpgradePayload<ServerMemberPayload>
>;
export type UpgradedServerMemberBanPayload = ServerUpgradePayload<
	ServerMemberBanPayload
>;
export type UpgradedServerMemberSummaryPayload = IDUpgradePayload<
	ServerUpgradePayload<ServerMemberSummaryPayload>
>;

export type ServerUpgradePayload<T> = T & { serverId: string };
export type IDUpgradePayload<T> = T & { id: string };
export type MessageContent =
	| ({
		content?: string;
		embeds?: Embed[] | EmbedPayload[];
	})
	| string
	| Embed;
export type MaybePromise<T> = T | Promise<T>;

export type ClientEvents = {
	ready: () => unknown;
	debug: (data: any) => unknown;
	exit: () => unknown;
	error: (reason: string, err: Error | null) => unknown;
	calendarEventCreated: (calendarEvent: CalendarEvent) => unknown;
	calendarEventUpdated: (
		calendarEvent: CalendarEvent,
		oldCalendar: CalendarEvent | null
	) => unknown;
	calendarEventDeleted: (calendarEvent: CalendarEvent) => unknown;
	calendarRsvpUpdated: (
		calendarEventRsvp: CalendarEventRsvp,
		oldCalendarRsvp: CalendarEventRsvp | null
	) => unknown;
	calendarRsvpManyUpdated: (
		calendarRsvpsEvent: Collection<string, CalendarEventRsvp>
	) => unknown;
	calendarRsvpDeleted: (calendarEventRsvp: CalendarEventRsvp) => unknown;
	messageCreated: (message: Message) => unknown;
	messageUpdated: (message: Message, oldMessage: Message | null) => unknown;
	messageDeleted: (event: MessageDeletedEvent) => unknown;
	messageReactionCreated: (reaction: MessageReaction) => unknown;
	messageReactionDeleted: (event: MessageReactionDeletedEvent) => unknown;
	channelCreated: (channel: Channel) => unknown;
	channelUpdated: (channel: Channel, oldChannel: Channel | null) => unknown;
	channelDeleted: (channel: Channel) => unknown;
	docCreated: (doc: DocPayload) => unknown;
	docUpdated: (newDoc: DocPayload, oldDoc: DocPayload | null) => unknown;
	docDeleted: (doc: DocPayload) => unknown;
	listItemCreated: (item: ListItemPayload) => unknown;
	listItemUpdated: (
		newItem: ListItemPayload,
		oldItem: ListItemPayload | ListItemSummaryPayload | null
	) => unknown;
	listItemDeleted: (item: ListItemPayload) => unknown;
	listItemCompleted: (item: ListItemPayload) => unknown;
	listItemUncompleted: (item: ListItemPayload) => unknown;
	memberJoined: (member: Member) => unknown;
	memberRemoved: (event: MemberRemovedEvent) => unknown;
	memberUpdated: (event: MemberUpdatedEvent) => unknown;
	memberBanned: (ban: MemberBan) => unknown;
	memberUnbanned: (event: MemberUnbannedEvent) => unknown;
	memberSocialLinkCreated: (
		serverId: string,
		socialLink: SocialLinkPayload
	) => unknown;
	memberSocialLinkUpdated: (
		serverId: string,
		socialLink: SocialLinkPayload
	) => unknown;
	memberSocialLinkDeleted: (
		serverId: string,
		socialLink: SocialLinkPayload
	) => unknown;
	botServerCreated: (server: Server, user: string) => unknown;
	botServerDeleted: (server: Server, user: string) => unknown;
	forumTopicCreated: (topic: ForumTopic) => unknown;
	forumTopicUpdated: (
		topic: ForumTopic,
		oldTopic: ForumTopic | null
	) => unknown;
	forumTopicDeleted: (topic: ForumTopic) => unknown;
	forumTopicPinned: (topic: ForumTopic) => unknown;
	forumTopicUnpinned: (topic: ForumTopic) => unknown;
	forumTopicLocked: (topic: ForumTopic) => unknown;
	forumTopicUnlocked: (topic: ForumTopic) => unknown;
	serverCreated: (server: { serverId: string }) => unknown;
	webhookCreated: (webhook: Webhook) => unknown;
	webhookUpdated: (webhook: Webhook, oldWebhook: Webhook | null) => unknown;
	rolesUpdated: (
		updatedMembers: {
			serverId: string;
			members: { userId: string; roleIds: number[] }[];
		},
		oldMembers: Member[]
	) => unknown;
	unknownGatewayEvent: (data: any) => unknown;
};
