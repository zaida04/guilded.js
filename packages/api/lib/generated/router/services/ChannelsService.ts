/* istanbul ignore file */
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
 * The topic of the channel. Not applicable to threads
 */
topic?: string;
/**
 * Whether the channel can be accessed from users who are not member of the server
 */
isPublic?: boolean;
/**
 * The type of channel. This will determine what routes to use for creating content in a channel. For example, if this "chat", then one must use the routes for creating channel messages. For threads, this **must** be "chat" for now
 */
type: 'announcements' | 'chat' | 'calendar' | 'forums' | 'media' | 'docs' | 'voice' | 'list' | 'scheduling' | 'stream';
/**
 * The ID of the server. Optional if providing a `groupId`, `categoryId`, `parentId` or `messageId`
 */
serverId?: string;
/**
 * The ID of the group. If not provided, channel will be created in the "Server home" group from `serverId` _or_ in the group that corresponds to the `categoryId` parameter. Optional if providing a `groupId`, `categoryId`, `parentId` or `messageId`
 */
groupId?: string;
/**
 * The category that the channel exists in. Only relevant for server channels. If not provided, channel will be a top-level channel. Optional if providing a `parentId` or `messageId`
 */
categoryId?: number;
/**
 * ID of the **immediate** parent channel or thread in the channel hierarchy. Only applicable to "chat", "voice", and "stream" channels and indicates that this channel is a thread, if present. Optional if providing a `messageId`
 */
parentId?: string;
/**
 * The ID of the message that this channel was created off of. Only applicable to "chat", "voice", and "stream" channels and indicates that this channel is a thread, if present
 */
messageId?: string;
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
