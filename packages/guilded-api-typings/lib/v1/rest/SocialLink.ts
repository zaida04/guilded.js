import { SocialLink } from "../structs/SocialLink";

/**
 * /servers/:serverId/members/:userId/social-links/:type
 */
export interface RESTGetMemberSocialLink {
    socialLink: SocialLink;
}
