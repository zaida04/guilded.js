export interface ListItemPayload {
    /** The ID of the list item. */
    id: string;
    /** The ID of the channel */
    channelId: string;
    /** The message of the list item. */
    message: string;
    /** The note of the list item. */
    note: string;
    /** The ISO 8601 timestamp that the list item was created at */
    createdAt: string;
    /** The ID of the user who created this list item (Note: If this event has createdByWebhookId present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA) */
    createdBy: string;
    /** The ID of the webhook who created this list item, if it was created by a webhook */
    createdByWebhookId?: string;
}
