/* istanbul ignore file */
/* eslint-disable */

import type { Mentions } from "./Mentions";

export type Doc = {
    /**
     * The ID of the doc
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
     * The title of the doc
     */
    title: string;
    /**
     * The content of the doc
     */
    content: string;
    mentions?: Mentions;
    /**
     * The ISO 8601 timestamp that the doc was created at
     */
    createdAt: string;
    /**
     * The ID of the user who created this doc
     */
    createdBy: string;
    /**
     * The ISO 8601 timestamp that the doc was updated at, if relevant
     */
    updatedAt?: string;
    /**
     * The ID of the user who updated this doc
     */
    updatedBy?: string;
};
