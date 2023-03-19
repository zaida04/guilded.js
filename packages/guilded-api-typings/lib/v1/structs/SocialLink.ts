/**
 * The type of social link to retrieve
 */
export type UserSocialLink =
  | "bnet"
  | "epic"
  | "facebook"
  | "origin"
  | "patreon"
  | "psn"
  | "roblox"
  | "steam"
  | "switch"
  | "twitch"
  | "twitter"
  | "xbox"
  | "youtube";

export type SocialLink = {
  createdAt: string;
  handle?: string;
  serviceId?: string;
  type: string;
  userId: string;
};
