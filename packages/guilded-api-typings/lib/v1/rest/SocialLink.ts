import { SocialLink } from "../structs/SocialLink";

/**
 * /members/:userId/social-links/:type
 */
export interface RESTGetMemberSocialLink {
    socialLink: SocialLink;
}
