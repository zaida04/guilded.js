/* istanbul ignore file */
/* eslint-disable */

import type { Mentions } from "./Mentions";

export type ForumTopic = {
    /**
     * The ID of the forum topic
     */
    id: number;
    /**
     * The ID of the server
     */
    serverId: string;
    /**
     * The ID of the channel
     */
    channelId: string;
    /**
     * The title of the forum topic
     */
    title: string;
    /**
     * The ISO 8601 timestamp that the forum topic was created at
     */
    createdAt: string;
    /**
     * The ID of the user who created this forum topic (Note: If this event has `createdByWebhookId` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)
     */
    createdBy: string;
    /**
     * The ISO 8601 timestamp that the forum topic was updated at, if relevant
     */
    updatedAt?: string;
    /**
     * The ISO 8601 timestamp that the forum topic was bumped at. This timestamp is updated whenever there is any activity on the posts within the forum topic.
     */
    bumpedAt?: string;
    isPinned?: boolean;
    isLocked?: boolean;
    /**
     * The content of the forum topic
     */
    content: string;
    mentions?: Mentions;
};
