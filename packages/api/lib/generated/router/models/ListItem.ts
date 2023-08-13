/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Mentions } from "./Mentions";

export type ListItem = {
    /**
     * The ID of the list item
     */
    id: string;
    /**
     * The ID of the server
     */
    serverId: string;
    /**
     * The ID of the channel
     */
    channelId: string;
    /**
     * The message of the list item
     */
    message: string;
    mentions?: Mentions;
    /**
     * The ISO 8601 timestamp that the list item was created at
     */
    createdAt: string;
    /**
     * The ID of the user who created this list item (Note: If this event has `createdByWebhookId` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)
     */
    createdBy: string;
    /**
     * The ID of the webhook who created this list item, if it was created by a webhook
     */
    createdByWebhookId?: string;
    /**
     * The ISO 8601 timestamp that the list item was updated at, if relevant
     */
    updatedAt?: string;
    /**
     * The ID of the user who updated this list item
     */
    updatedBy?: string;
    /**
     * The ID of the parent list item if this list item is nested
     */
    parentListItemId?: string;
    /**
     * The ISO 8601 timestamp that the list item was completed at
     */
    completedAt?: string;
    /**
     * The ID of the user who completed this list item
     */
    completedBy?: string;
    note?: {
        /**
         * The ISO 8601 timestamp that the note was created at. If this field is populated, then there's a note associated with the list item
         */
        createdAt: string;
        /**
         * The ID of the user who created this note
         */
        createdBy: string;
        /**
         * The ISO 8601 timestamp that the note was updated at, if relevant
         */
        updatedAt?: string;
        /**
         * The ID of the user who updated this note
         */
        updatedBy?: string;
        mentions?: Mentions;
        /**
         * The note of the list item
         */
        content: string;
    };
};
