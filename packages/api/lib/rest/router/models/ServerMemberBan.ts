/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserSummary } from './UserSummary';

export type ServerMemberBan = {
    user: UserSummary;
    /**
     * The reason for the ban as submitted by the banner
     */
    reason?: string;
    /**
     * The ID of the user who created this server member ban
     */
    createdBy: string;
    /**
     * The ISO 8601 timestamp that the server member ban was created at
     */
    createdAt: string;
};
