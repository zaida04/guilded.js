import { User } from "../../structures";
import { Member, PartialMember } from "../../structures/Member";
import CacheableStructManager from "./CacheableStructManager";
import Collection from "@discordjs/collection";
import type { SocialLink, UserSocialLink } from "@guildedjs/guilded-api-typings";

export default class GlobalMemberManager extends CacheableStructManager<string, Member> {
    /** Fetch a member from a server */
    fetch(serverId: string, memberId: string): Promise<Member> {
        return this.client.rest.router.getMember(serverId, memberId).then((data) => {
            const newMember = new Member(this.client, { ...data.member, serverId, id: data.member.user.id });
            this.client.users.cache.set(data.member.user.id, new User(this.client, data.member.user));
            this.client.members.cache.set(`${serverId}:${newMember.id}`, newMember);
            return newMember;
        });
    }

    /** Fetch all members from a server. Returned objects are partial members */
    fetchMany(serverId: string): Promise<Collection<string, PartialMember>> {
        return this.client.rest.router.getMembers(serverId).then((data) => {
            const members = new Collection<string, PartialMember>();
            for (const member of data.members) {
                const newMember = new PartialMember(this.client, { serverId, id: member.user.id, ...member });
                members.set(newMember.id, newMember);
            }
            return members;
        });
    }

    /** Kick a member from a server */
    kick(serverId: string, memberId: string): Promise<Member | null> {
        return this.client.rest.router.kickMember(serverId, memberId).then((_) => this.client.members.cache.get(`${serverId}:${memberId}`) ?? null);
    }

    /** Get a list of the roles assigned to a member using the id of the member. */
    getRoles(serverId: string, memberId: string): Promise<number[]> {
        return this.client.rest.router.getMemberRoles(serverId, memberId).then((data) => data.roleIds);
    }

    /** Update a member's nickname. Returns the new name */
    updateNickname(serverId: string, memberId: string, newNickname: string): Promise<string> {
        return this.client.rest.router.updateMemberNickname(serverId, memberId, newNickname).then((data) => data.nickname);
    }

    /** Delete a member's nickname */
    resetNickname(serverId: string, memberId: string): Promise<void> {
        return this.client.rest.router.deleteMemberNickname(serverId, memberId).then(() => void 0);
    }

    /** Award XP to a member */
    giveXP(serverId: string, memberId: string, amount: number): Promise<number> {
        return this.client.rest.router.awardMemberXP(serverId, memberId, amount).then((data) => data.total);
    }

    /** Retrieves a member's public social links */
    fetchSocialLinks(serverId: string, memberId: string, type: UserSocialLink): Promise<SocialLink> {
        return this.client.rest.router.getMemberSocialLinks(serverId, memberId, type).then((data) => data.socialLink);
    }
}
