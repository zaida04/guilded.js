/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Mentions } from './Mentions';

export type DocComment = {
    /**
     * The ID of the doc comment
     */
    id: number;
    /**
     * The content of the doc comment
     */
    content: string;
    /**
     * The ISO 8601 timestamp that the doc comment was created at
     */
    createdAt: string;
    /**
     * The ID of the user who created this doc comment (Note: If this event has `createdByWebhookId` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)
     */
    createdBy: string;
    /**
     * The ISO 8601 timestamp that the doc comment was updated at, if relevant
     */
    updatedAt?: string;
    /**
     * The ID of the channel
     */
    channelId: string;
    /**
     * The ID of the doc
     */
    docId: number;
    mentions?: Mentions;
};
