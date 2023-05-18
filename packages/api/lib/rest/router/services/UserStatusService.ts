/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserStatusService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Update your status
     * **Note** - at this time, you can only set a status on your own user
     * @returns void 
     * @throws ApiError
     */
    public userStatusCreate({
userId,
requestBody,
}: {
userId: (string | '@me'),
requestBody: {
/**
 * The content of the user status. The supported markdown for this content only includes reactions and plaintext for now
 */
content?: string;
/**
 * Emote ID to apply
 */
emoteId: number;
},
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/{userId}/status',
            path: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete your status
     * **Note** - at this time, you can only set a status on your own user
     * @returns void 
     * @throws ApiError
     */
    public userStatusDelete({
userId,
}: {
userId: (string | '@me'),
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/{userId}/status',
            path: {
                'userId': userId,
            },
        });
    }

}
