/**
 * The type of social link to retrieve
 */
export type UserSocialLink =
    "bnet" | "facebook" | "origin" | "patreon" | "psn" | "roblox" | "steam" | "switch" | "twitch" | "twitter" | "xbox" | "youtube";

export type SocialLink = {
    handle?: string;
    serviceId?: string;
    type: string;
}
