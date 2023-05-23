/* istanbul ignore file */

/* eslint-disable */
import type { SocialLink } from "../models/SocialLink";
import { HttpRequest } from "../core/HttpRequest";

export class SocialLinksService {
  constructor(public readonly httpRequest: HttpRequest) {}

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
    serverId: string;
    userId: string | "@me";
    /**
     * The type of social link to retrieve
     */
    socialLinkType:
      | "twitch"
      | "bnet"
      | "psn"
      | "xbox"
      | "steam"
      | "origin"
      | "youtube"
      | "twitter"
      | "facebook"
      | "switch"
      | "patreon"
      | "roblox"
      | "epic";
  }): Promise<{
    socialLink: SocialLink;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/servers/{serverId}/members/{userId}/social-links/{socialLinkType}",
      path: {
        serverId: serverId,
        userId: userId,
        socialLinkType: socialLinkType,
      },
    });
  }
}
