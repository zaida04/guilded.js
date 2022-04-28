export interface ListItemPayload {
    /** The ID of the list item. */
    id: string;
    /** The ID of the server this list item belongs to */
    serverId: string;
    /** The ID of the channel this list item belongs to*/
    channelId: string;
    /** The message of the list item. */
    message: string;
    /** The note of the list item. */
    note?: ListNoteContent;
    /** The ISO 8601 timestamp that the list item was created at */
    createdAt: string;
    /** The ID of the user who created this list item (Note: If this event has createdByWebhookId present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA) */
    createdBy: string;
    /** The ID of the webhook who created this list item, if it was created by a webhook */
    createdByWebhookId?: string;
    /** The timestamp of when this list item was updated at */
    updatedAt?: string;
    /** The ID of the user who updated this listt item */
    updatedBy?: string;
    /** The ID of the parent list this item belongs to if nested */
    parentListItemId?: string;
    /** The timestmap of when this list item was completed at */
    completedAt?: string;
}

export type ListItemSummaryPayload = Omit<ListItemPayload, "note"> & { note?: Omit<ListNoteContent, "content"> };

export interface ListNoteContent {
    createdAt: string;
    createdBy: string;
    content: string;
    updatedAt?: string;
    updatedBy?: string;
}
