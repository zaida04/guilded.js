/* istanbul ignore file */
/* eslint-disable */

export type UserStatus = {
    /**
     * The content of the user status. The supported markdown for this content only includes reactions and plaintext for now
     */
    content?: string;
    /**
     * Emote ID
     */
    emoteId: number;
};
