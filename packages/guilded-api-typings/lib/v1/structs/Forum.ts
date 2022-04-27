export interface ForumThreadPayload {
    /** The ID of the forum thread */
    id: number;
    /** The ID of the server this forum thread belongs to */
    serverId: string;
    /** The ID of the channel this forum thread belongs to */
    channelId: string;
    /** The title of the forum thread */
    title?: string;
    /** The content of the forum thread */
    content?: string;
    /** The ISO 8601 timestamp that the forum thread was created at */
    createdAt: string;
    /** The ID of the user who created this forum thread (Note: If this event has createdByWebhookId present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA) */
    createdBy: string;
    /** The ID of the webhook who created this forum thread, if it was created by a webhook */
    createdByWebhookId?: string;
}
