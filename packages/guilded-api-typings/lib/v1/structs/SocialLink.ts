/** The type of social link to retrieve */
export type UserSocialLink =
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
    | "roblox";

export interface SocialLink {
    type: string;
    serviceId?: string;
    handle?: string;
}
