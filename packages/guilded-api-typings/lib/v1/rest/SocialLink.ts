import type { SocialLink } from "../structs/SocialLink";

/**
 * /servers/:serverId/members/:userId/social-links/:type
 */
export type RESTGetMemberSocialLinkResult = {
    socialLink: SocialLink;
}
