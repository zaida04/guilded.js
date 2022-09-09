import type { MentionsPayload } from "./Message";

export interface ForumTopicPayload {
    /** The ID of the forum topic */
    id: number;
    /** The ID of the server this forum topic belongs to */
    serverId: string;
    /** The ID of the channel this forum topic belongs to */
    channelId: string;
    /** The title of the forum topic */
    title: string;
    /** The content of the forum topic */
    content: string;
    /** The ISO 8601 timestamp that the forum topic was created at */
    createdAt: string;
    /** The ID of the user who created this forum topic (Note: If this event has createdByWebhookId present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA) */
    createdBy: string;
    /** The ID of the webhook who created this forum topic, if it was created by a webhook */
    createdByWebhookId?: string;
    /** When, if at all, this forum topic was updated */
    updatedAt: string;
    /** When, if at all, this forum topic was bumped */
    bumpedAt: string;
    /** Whether this forum topic is pinned */
    isPinned: boolean;
    /** The mentions within this forum topic */
    mentions: MentionsPayload;
}

export type ForumTopicSummaryPayload = Pick<
    ForumTopicPayload,
    "id" | "serverId" | "channelId" | "title" | "createdAt" | "createdBy" | "createdByWebhookId" | "updatedAt" | "bumpedAt" | "isPinned"
>;
