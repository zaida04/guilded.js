/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ServerXpService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Award XP to a member
     * @returns any Success
     * @throws ApiError
     */
    public serverXpForUserCreate({
        serverId,
        userId,
        requestBody,
    }: {
        serverId: string;
        /**
         * Member ID to award XP to
         */
        userId: string | "@me";
        requestBody: {
            /**
             * The amount of XP to award
             */
            amount: number;
        };
    }): CancelablePromise<{
        /**
         * The total XP after this operation
         */
        total: number;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/servers/{serverId}/members/{userId}/xp",
            path: {
                serverId: serverId,
                userId: userId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Set a member's XP
     * @returns any Success
     * @throws ApiError
     */
    public serverXpForUserUpdate({
        serverId,
        userId,
        requestBody,
    }: {
        serverId: string;
        /**
         * Member ID to set XP to
         */
        userId: string | "@me";
        requestBody: {
            /**
             * The total XP to set on the user
             */
            total: number;
        };
    }): CancelablePromise<{
        /**
         * The total XP after this operation
         */
        total: number;
    }> {
        return this.httpRequest.request({
            method: "PUT",
            url: "/servers/{serverId}/members/{userId}/xp",
            path: {
                serverId: serverId,
                userId: userId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Bulk award XP to members
     * Take note of the max number of `userIds` that can be submitted on each request. If you require more, please batch your requests
     * @returns any Success
     * @throws ApiError
     */
    public serverXpForUserCreateMany({
        serverId,
        requestBody,
    }: {
        serverId: string;
        requestBody: {
            /**
             * The amount of XP to award
             */
            amount: number;
            userIds: Array<string | "@me">;
        };
    }): CancelablePromise<{
        /**
         * Each key of the object will be a user ID, and its value will be the total for that user after this operation
         */
        totalsByUserId: Record<string, number>;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/servers/{serverId}/xp",
            path: {
                serverId: serverId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Bulk set members' XP
     * Take note of the max number of `userIds` that can be submitted on each request. If you require more, please batch your requests
     * @returns any Success
     * @throws ApiError
     */
    public serverXpForUserUpdateMany({
        serverId,
        requestBody,
    }: {
        serverId: string;
        requestBody: {
            /**
             * The total XP to set on each user
             */
            total?: number;
            userIds: Array<string | "@me">;
        };
    }): CancelablePromise<{
        /**
         * Each key of the object will be a user ID, and its value will be the total for that user after this operation
         */
        totalsByUserId: Record<string, number>;
    }> {
        return this.httpRequest.request({
            method: "PUT",
            url: "/servers/{serverId}/xp",
            path: {
                serverId: serverId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Award XP to role
     * Award XP to all members with a particular role.
     * @returns void
     * @throws ApiError
     */
    public serverXpForRoleCreate({
        serverId,
        roleId,
        requestBody,
    }: {
        serverId: string;
        /**
         * Role ID to award XP to
         */
        roleId: number;
        requestBody: {
            /**
             * The amount of XP to award
             */
            amount: number;
        };
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "POST",
            url: "/servers/{serverId}/roles/{roleId}/xp",
            path: {
                serverId: serverId,
                roleId: roleId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }
}
