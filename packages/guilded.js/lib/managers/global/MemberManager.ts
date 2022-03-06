import { UserSocialLink } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class MemberManager extends GlobalManager {
    /** Get a list of the roles assigned to a member using the id of the member. */
    getRoles(serverId: string, memberId: string) {
        return this.client.rest.router.getMemberRoles(serverId, memberId);
    }

    /** Update a member's nickname. */
    updateNicknames(serverId: string, memberId: string, newNickname: string) {
        return this.client.rest.router.updateMemberNickname(serverId, memberId, newNickname);
    }

    /** Delete a member's nickname */
    resetNickname(serverId: string, memberId: string) {
        return this.client.rest.router.deleteMemberNickname(serverId, memberId);
    }

    /** Award XP to a member */
    giveXP(serverId: string, memberId: string, amount: number) {
        return this.client.rest.router.awardMemberXP(serverId, memberId, amount);
    }

    /** Retrieves a member's public social links */
    getSocialLinks(serverId: string, memberId: string, type: UserSocialLink) {
        return this.client.rest.router.getMemberSocialLinks(serverId, memberId, type);
    }
}
