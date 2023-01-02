export type DocPayload = {
    /**
     * The ID of the channel this doc belongs to
     */
    channelId: string;
    /**
     * The content of the doc
     */
    content: string;
    /**
     * The ISO 8601 timestamp that the doc was was created at
     */
    createdAt: string;
    /**
     * The ID of the user who created this doc
     */
    createdBy: string;
    /**
     * The id of the doc
     */
    id: number;
    /**
     * The ID of the server this doc belongs to
     */
    serverId: string;
    /**
     * The title of the doc
     */
    title: string;
    /**
     * The ISO 8601 timestamp that the doc was updated at, if relevant
     */
    updatedAt?: string;
    /**
     * The ID of the user who updated this doc
     */
    updatedBy?: string;
}
