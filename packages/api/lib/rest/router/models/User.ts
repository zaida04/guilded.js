/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserStatus } from './UserStatus';

export type User = {
    /**
     * The ID of the user
     */
    id: string;
    /**
     * The type of user. If this property is absent, it can assumed to be of type `user`
     */
    type?: 'bot' | 'user';
    /**
     * The user's name
     */
    name: string;
    /**
     * The avatar image associated with the user
     */
    avatar?: string;
    /**
     * The banner image associated with the user
     */
    banner?: string;
    /**
     * The ISO 8601 timestamp that the user was created at
     */
    createdAt: string;
    status?: UserStatus;
};
