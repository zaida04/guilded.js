/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Mentions } from './Mentions';

export type ForumTopicComment = {
    /**
     * The ID of the forum topic comment
     */
    id: number;
    /**
     * The content of the forum topic comment
     */
    content: string;
    /**
     * The ISO 8601 timestamp that the forum topic comment was created at
     */
    createdAt: string;
    /**
     * The ISO 8601 timestamp that the forum topic comment was updated at, if relevant
     */
    updatedAt?: string;
    /**
     * The ID of the channel
     */
    channelId: string;
    /**
     * The ID of the forum topic
     */
    forumTopicId: number;
    /**
     * The ID of the user who created this forum topic comment (Note: If this event has `createdByWebhookId` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)
     */
    createdBy: string;
    mentions?: Mentions;
};
