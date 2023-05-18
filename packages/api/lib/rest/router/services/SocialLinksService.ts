/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SocialLink } from '../models/SocialLink';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SocialLinksService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Retrieves a member's public social links
     * @returns any Success
     * @throws ApiError
     */
    public memberSocialLinkRead({
serverId,
userId,
socialLinkType,
}: {
serverId: string,
userId: (string | '@me'),
/**
 * The type of social link to retrieve
 */
socialLinkType: 'twitch' | 'bnet' | 'psn' | 'xbox' | 'steam' | 'origin' | 'youtube' | 'twitter' | 'facebook' | 'switch' | 'patreon' | 'roblox' | 'epic',
}): CancelablePromise<{
socialLink: SocialLink;
}> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/servers/{serverId}/members/{userId}/social-links/{socialLinkType}',
            path: {
                'serverId': serverId,
                'userId': userId,
                'socialLinkType': socialLinkType,
            },
        });
    }

}
