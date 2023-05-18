/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Group = {
    /**
     * The ID of the group
     */
    id: string;
    /**
     * The ID of the server
     */
    serverId: string;
    /**
     * The name of the group
     */
    name: string;
    /**
     * The description associated with the group
     */
    description?: string;
    /**
     * The avatar image associated with the group
     */
    avatar?: string;
    /**
     * If `true`, this is the server's home group
     */
    isHome?: boolean;
    /**
     * The emote to associate with the group
     */
    emoteId?: number;
    /**
     * Is this group open for anyone to join?
     */
    isPublic?: boolean;
    /**
     * The ISO 8601 timestamp that the group was created at
     */
    createdAt: string;
    /**
     * The ID of the user who created this group
     */
    createdBy: string;
    /**
     * The ISO 8601 timestamp that the group was updated at, if relevant
     */
    updatedAt?: string;
    /**
     * The ID of the user who updated this group
     */
    updatedBy?: string;
    /**
     * The ISO 8601 timestamp that the group was archived at, if relevant
     */
    archivedAt?: string;
    /**
     * The ID of the user who archived this group
     */
    archivedBy?: string;
};
