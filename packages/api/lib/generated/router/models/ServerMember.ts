/* istanbul ignore file */
/* eslint-disable */

import type { User } from "./User";

export type ServerMember = {
    user: User;
    roleIds: Array<number>;
    nickname?: string;
    /**
     * The ISO 8601 timestamp that the member was created at
     */
    joinedAt: string;
    isOwner?: boolean;
};
