export enum WSOpCodes {
    SUCCESS,
    WELCOME,
    RESUME,
    ERROR = 8,
    PING,
    PONG,
}

export const WebSocketEvents = {
    CalendarEventCreated: "CalendarEventCreated",
    CalendarEventUpdated: "CalendarEventUpdated",
    CalendarEventDeleted: "CalendarEventDeleted",
    CalendarEventRsvpUpdated: "CalendarEventRsvpUpdated",
    CalendarEventRsvpManyUpdated: "CalendarEventRsvpManyUpdated",
    CalendarEventRsvpDeleted: "CalendarEventRsvpDeleted",
    ChatMessageCreated: "ChatMessageCreated",
    ChatMessageUpdated: "ChatMessageUpdated",
    ChatMessageDeleted: "ChatMessageDeleted",
    ServerMemberJoined: "ServerMemberJoined",
    ServerMemberRemoved: "ServerMemberRemoved",
    ServerMemberUpdated: "ServerMemberUpdated",
    ServerMemberBanned: "ServerMemberBanned",
    ServerMemberUnbanned: "ServerMemberUnbanned",
    BotServerMembershipCreated: "BotServerMembershipCreated",
    ServerRolesUpdated: "ServerRolesUpdated",
    ServerWebhookCreated: "ServerWebhookCreated",
    ServerWebhookUpdated: "ServerWebhookUpdated",
    ListItemCompleted: "ListItemCompleted",
    ListItemUncompleted: "ListItemUncompleted",
    ListItemCreated: "ListItemCreated",
    ListItemUpdated: "ListItemUpdated",
    ListItemDeleted: "ListItemDeleted",
    ServerChannelCreated: "ServerChannelCreated",
    ServerChannelUpdated: "ServerChannelUpdated",
    ServerChannelDeleted: "ServerChannelDeleted",
    DocCreated: "DocCreated",
    DocUpdated: "DocUpdated",
    DocDeleted: "DocDeleted",
    ChannelMessageReactionCreated: "ChannelMessageReactionCreated",
    ChannelMessageReactionDeleted: "ChannelMessageReactionDeleted",
    ForumTopicCreated: "ForumTopicCreated",
    ForumTopicUpdated: "ForumTopicUpdated",
    ForumTopicDeleted: "ForumTopicDeleted",
    ForumTopicPinned: "ForumTopicPinned",
    ForumTopicUnpinned: "ForumTopicUnpinned",
    ForumTopicLocked: "ForumTopicLocked",
    ForumTopicUnlocked: "ForumTopicUnlocked",
} as const;
export type WSEvent = typeof WebSocketEvents;

export type SkeletonWSPayload = {
    d: unknown;
    op: WSOpCodes;
    s?: string;
    t: keyof WSEvent;
}

export type WSWelcomePayload = SkeletonWSPayload & {
    d: {
        heartbeatIntervalMs: number;
        lastMessageId: string;
        user: {
            botId: string;
            createdAt: string;
            createdBy: string;
            id: string;
            name: string;
        };
    };
}
