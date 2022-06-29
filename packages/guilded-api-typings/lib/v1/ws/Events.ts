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
    ChatMessageCreated: "ChatMessageCreated",
    ChatMessageUpdated: "ChatMessageUpdated",
    ChatMessageDeleted: "ChatMessageDeleted",
    TeamMemberJoined: "TeamMemberJoined",
    TeamMemberRemoved: "TeamMemberRemoved",
    TeamMemberUpdated: "TeamMemberUpdated",
    TeamMemberBanned: "TeamMemberBanned",
    TeamMemberUnbanned: "TeamMemberUnbanned",
    // This is intentional. Legacy change on Guilded's end.
    teamRolesUpdated: "teamRolesUpdated",
    TeamWebhookCreated: "TeamWebhookCreated",
    TeamWebhookUpdated: "TeamWebhookUpdated",
    ListItemCompleted: "ListItemCompleted",
    ListItemUncompleted: "ListItemUncompleted",
    ListItemCreated: "ListItemCreated",
    ListItemUpdated: "ListItemUpdated",
    ListItemDeleted: "ListItemDeleted",
    TeamChannelCreated: "TeamChannelCreated",
    TeamChannelUpdated: "TeamChannelUpdated",
    TeamChannelDeleted: "TeamChannelDeleted",
    DocCreated: "DocCreated",
    DocUpdated: "DocUpdated",
    DocDeleted: "DocDeleted",
    ChannelMessageReactionCreated: "ChannelMessageReactionCreated",
    ChannelMessageReactionDeleted: "ChannelMessageReactionDeleted",
} as const;
export type WSEvent = typeof WebSocketEvents;

export interface SkeletonWSPayload {
    d: unknown;
    s?: string;
    op: WSOpCodes;
    t: keyof WSEvent;
}

export interface WSWelcomePayload extends SkeletonWSPayload {
    d: {
        heartbeatIntervalMs: number;
        user: {
            id: string;
            botId: string;
            name: string;
            createdAt: string;
            createdBy: string;
        };
        lastMessageId: string;
    };
}
