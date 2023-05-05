import type {
  EmbedPayload,
  RestBody,
  RestPath,
  Schema,
} from "@guildedjs/guilded-api-typings";
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

export type UpgradedServerMemberPayload = IDUpgradePayload<
  ServerUpgradePayload<Schema<"ServerMember">>
>;
export type UpgradedServerMemberBanPayload = ServerUpgradePayload<
  Schema<"ServerMemberBan">
>;
export type UpgradedServerMemberSummaryPayload = IDUpgradePayload<
  ServerUpgradePayload<Schema<"ServerMemberSummary">>
>;

export type ServerUpgradePayload<T> = T & { serverId: string };
export type IDUpgradePayload<T> = T & { id: string };
export type MessageContent =
  | (Omit<
      RestBody<RestPath<"/channels/{channelId}/messages">["post"]>,
      "embeds"
    > & {
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
  docCreated: (doc: Schema<"Doc">) => unknown;
  docUpdated: (newDoc: Schema<"Doc">, oldDoc: Schema<"Doc"> | null) => unknown;
  docDeleted: (doc: Schema<"Doc">) => unknown;
  listItemCreated: (item: Schema<"ListItem">) => unknown;
  listItemUpdated: (
    newItem: Schema<"ListItem">,
    oldItem: Schema<"ListItem"> | Schema<"ListItemSummary"> | null
  ) => unknown;
  listItemDeleted: (item: Schema<"ListItem">) => unknown;
  listItemCompleted: (item: Schema<"ListItem">) => unknown;
  listItemUncompleted: (item: Schema<"ListItem">) => unknown;
  memberJoined: (member: Member) => unknown;
  memberRemoved: (event: MemberRemovedEvent) => unknown;
  memberUpdated: (event: MemberUpdatedEvent) => unknown;
  memberBanned: (ban: MemberBan) => unknown;
  memberUnbanned: (event: MemberUnbannedEvent) => unknown;
  memberSocialLinkCreated: (
    serverId: string,
    socialLink: Schema<"SocialLink">
  ) => unknown;
  memberSocialLinkUpdated: (
    serverId: string,
    socialLink: Schema<"SocialLink">
  ) => unknown;
  memberSocialLinkDeleted: (
    serverId: string,
    socialLink: Schema<"SocialLink">
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
