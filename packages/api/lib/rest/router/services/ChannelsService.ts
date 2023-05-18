/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ServerChannel } from '../models/ServerChannel';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ChannelsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a channel
     * Only server channels are supported at this time (coming soon™: DM Channels!)
     * @returns any Success
     * @throws ApiError
     */
    public channelCreate({
requestBody,
}: {
requestBody: {
/**
 * The name of the channel
 */
name: string;
/**
 * The topic of the channel
 */
topic?: string;
/**
 * Whether the channel can be accessed from users who are not member of the server
 */
isPublic?: boolean;
/**
 * The type of channel to create
 */
type: 'announcements' | 'chat' | 'calendar' | 'forums' | 'media' | 'docs' | 'voice' | 'list' | 'scheduling' | 'stream';
/**
 * The server that the channel should be created in. Optional if providing a `groupId` or `categoryId`
 */
serverId?: string;
/**
 * The group that the channel should be created in. If not provided, channel will be created in the "Server home" group from `serverId` _or_ in the group that corresponds to the `categoryId` parameter
 */
groupId?: string;
/**
 * The category the channel should go in. If not provided, channel will be a top-level channel
 */
categoryId?: number;
},
}): CancelablePromise<{
channel: ServerChannel;
}> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/channels',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get a channel
     * Only server channels are supported at this time (coming soon™: DM Channels!)
     * @returns any Success
     * @throws ApiError
     */
    public channelRead({
channelId,
}: {
channelId: string,
}): CancelablePromise<{
channel: ServerChannel;
}> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/channels/{channelId}',
            path: {
                'channelId': channelId,
            },
        });
    }

    /**
     * Update a channel
     * Only server channels are supported at this time (coming soon™: DM Channels!)
     * @returns any Success
     * @throws ApiError
     */
    public channelUpdate({
channelId,
requestBody,
}: {
channelId: string,
requestBody: {
/**
 * The name of the channel or thread
 */
name?: string;
/**
 * The topic of the channel. Not applicable to threads
 */
topic?: string | null;
/**
 * Whether the channel can be accessed from users who are not member of the server. Not applicable to threads
 */
isPublic?: boolean;
},
}): CancelablePromise<{
channel: ServerChannel;
}> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/channels/{channelId}',
            path: {
                'channelId': channelId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete a channel
     * Only server channels are supported at this time (coming soon™: DM Channels!)
     * @returns void 
     * @throws ApiError
     */
    public channelDelete({
channelId,
}: {
channelId: string,
}): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/channels/{channelId}',
            path: {
                'channelId': channelId,
            },
        });
    }

}
