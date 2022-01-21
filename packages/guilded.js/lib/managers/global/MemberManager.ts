import { UserSocialLink } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class MemberManager  extends GlobalManager {
    /** Get a list of the roles assigned to a member using the id of the member. */
    getMemberRoles(userId: string) {
        return this.client.rest.router.getMemberRoles(userId);
    }

    /** Update a member's nickname. */
    updateMemberNickname(userId: string, newNickname: string) {
        return this.client.rest.router.updateMemberNickname(userId, newNickname);
    }

    /** Delete a member's nickname */
    deleteMemberNickname(userId: string) {
        return this.client.rest.router.deleteMemberNickname(userId);
    }

    /** Award XP to a member */
    awardMemberXP(userId: string, amount: number) {
        return this.client.rest.router.awardMemberXP(userId, amount);
    }

    /** Retrieves a member's public social links */
    getMemberSocialLinks(userId: string, type: UserSocialLink) {
        return this.client.rest.router.getMemberSocialLinks(userId, type);
    }
}