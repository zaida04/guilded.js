export type ContentReactionPayload = {
    /**
     * The ISO 8601 timestamp that the emote was created at
     */
    createdAt: string;
    /**
     * The ID of the user who created this list item (Note: If this event has createdByWebhookId present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)
     */
    createdBy: string;
    /**
     * The ID of the webhook who created this list item, if it was created by a webhook
     */
    createdByWebhookId?: string;
    /**
     * The ID of the content reaction
     */
    id: number;
    /**
     * The ID of the server this reaction belongs to
     */
    serverId: string;
}
