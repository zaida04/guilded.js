/* istanbul ignore file */

/* eslint-disable */

export type SocialLink = {
  /**
   * The type of social link that Guilded supports. Depending on this value, `handle` or `serviceId` may or may not be present
   */
  type:
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
  /**
   * The ID of the user that the social link is associated with
   */
  userId: string;
  /**
   * The handle of the user within the external service
   */
  handle?: string;
  /**
   * The unique ID that represents this member's social link within the external service
   */
  serviceId?: string;
  /**
   * The ISO 8601 timestamp that the social link was created at
   */
  createdAt: string;
};
