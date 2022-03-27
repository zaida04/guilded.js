import { User } from "../../structures";
import { Member } from "../../structures/Member";
import CacheableStructManager from "./CacheableStructManager";
import Collection from "@discordjs/collection";
import type { UserSocialLink } from "@guildedjs/guilded-api-typings";

export default class GlobalMemberManager extends CacheableStructManager<string, Member> {
    fetch(serverId: string, memberId: string) {
        return this.client.rest.router.getMember(serverId, memberId).then(data => {
            const newMember = new Member(this.client, { ...data.member, serverId, id: data.member.user.id });
            this.client.users.cache.set(data.member.user.id, new User(this.client, data.member.user));
            this.client.members.cache.set(`${serverId}:${newMember.id}`, newMember);
            return newMember;
        })
    }

    /** Kick a member from a server */
    kick(serverId: string, memberId: string) {
        return this.client.rest.router.kickMember(serverId, memberId);
    }

    /** Get a list of the roles assigned to a member using the id of the member. */
    getRoles(serverId: string, memberId: string) {
        return this.client.rest.router.getMemberRoles(serverId, memberId);
    }

    /** Update a member's nickname. */
    updateNickname(serverId: string, memberId: string, newNickname: string) {
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
    fetchSocialLinks(serverId: string, memberId: string, type: UserSocialLink) {
        return this.client.rest.router.getMemberSocialLinks(serverId, memberId, type);
    }
}
