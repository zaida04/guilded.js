import type { MentionsPayload } from "./Message";

export type ForumTopicPayload = {
    /**
     * When, if at all, this forum topic was bumped
     */
    bumpedAt?: string;
    /**
     * The ID of the channel this forum topic belongs to
     */
    channelId: string;
    /**
     * The content of the forum topic
     */
    content: string;
    /**
     * The ISO 8601 timestamp that the forum topic was created at
     */
    createdAt: string;
    /**
     * The ID of the user who created this forum topic (Note: If this event has createdByWebhookId present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)
     */
    createdBy: string;
    /**
     * The ID of the webhook who created this forum topic, if it was created by a webhook
     */
    createdByWebhookId?: string;
    /**
     * The ID of the forum topic
     */
    id: number;
    /**
     * Whether this forum topic is locked
     */
    isLocked?: boolean;
    /**
     * Whether this forum topic is pinned
     */
    isPinned?: boolean;
    /**
     * The mentions within this forum topic
     */
    mentions?: MentionsPayload;
    /**
     * The ID of the server this forum topic belongs to
     */
    serverId: string;
    /**
     * The title of the forum topic
     */
    title: string;
    /**
     * When, if at all, this forum topic was updated
     */
    updatedAt?: string;
}

export type ForumTopicSummaryPayload = Pick<
    ForumTopicPayload,
    "bumpedAt" | "channelId" | "createdAt" | "createdBy" | "createdByWebhookId" | "id" | "isPinned" | "serverId" | "title" | "updatedAt"
>;
