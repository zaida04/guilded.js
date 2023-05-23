import { User } from "../../structures";
import { Member, MemberBan, PartialMember } from "../../structures/Member";
import { CacheableStructManager } from "./CacheableStructManager";
import { Collection } from "@discordjs/collection";
import { buildMemberKey } from "../../util";
import { SocialLinkPayload } from "@guildedjs/api";

/**
 * A class representing a manager for Discord server members.
 * @extends CacheableStructManager.
 */
export class GlobalMemberManager extends CacheableStructManager<
  string,
  Member
> {
  /**
   * Whether or not social links should be cached.
   */
  get shouldCacheSocialLinks() {
    return this.client.options.cache?.cacheSocialLinks !== false;
  }

  /**
   * Fetches a member from a server.
   * @param serverId The ID of the server to fetch the member from.
   * @param userId The ID of the member to fetch.
   * @param force Whether to force a fetch from the API.
   * @returns A Promise that resolves with the fetched member.
   */
  fetch(serverId: string, userId: string, force?: boolean): Promise<Member> {
    const memberKey = buildMemberKey(serverId, userId);
    if (!force) {
      const existingMember = this.client.members.cache.get(memberKey);
      if (existingMember) return Promise.resolve(existingMember);
    }
    return this.client.rest.router.members
      .serverMemberRead({ serverId, userId })
      .then((data) => {
        const newMember = new Member(this.client, {
          ...data.member,
          serverId,
          id: data.member.user.id,
        });
        this.client.users.cache.set(
          data.member.user.id,
          new User(this.client, data.member.user)
        );
        this.client.members.cache.set(memberKey, newMember);
        return newMember;
      });
  }

  /**
   * Fetches all members from a server. Returned objects are partial members.
   * @param serverId The ID of the server to fetch members from.
   * @returns A Promise that resolves with a collection of partial members.
   */
  fetchMany(serverId: string): Promise<Collection<string, PartialMember>> {
    return this.client.rest.router.members
      .serverMemberReadMany({ serverId })
      .then((data) => {
        const members = new Collection<string, PartialMember>();
        for (const member of data.members) {
          const newMember = new PartialMember(this.client, {
            serverId,
            id: member.user.id,
            ...member,
          });
          members.set(newMember.id, newMember);
        }
        return members;
      });
  }

  /**
   * Kicks a member from a server.
   * @param serverId The ID of the server to kick the member from.
   * @param userId The ID of the member to kick.
   * @returns A Promise that resolves with the kicked member, or null if the member was not cached.
   */
  kick(serverId: string, userId: string): Promise<Member | null> {
    return this.client.rest.router.members
      .serverMemberDelete({ serverId, userId })
      .then(
        (_) =>
          this.client.members.cache.get(buildMemberKey(serverId, userId)) ??
          null
      );
  }

  /**
   * Bans a member from a server.
   * @param serverId The ID of the server to ban the member from.
   * @param userId The ID of the user to ban.
   * @returns A Promise that resolves with the banned member, or null if the member was not cached.
   */
  ban(serverId: string, userId: string): Promise<MemberBan | null> {
    return this.client.bans.ban(serverId, userId);
  }

  /**
   * Unbans a user from a server.
   * @param serverId The ID of the server.
   * @param userId The ID of the user.
   * @param removeBanIfCached Whether to remove the ban from the cache if it exists.
   * @returns A Promise that resolves with the unbanned member ban or `null` if it isn't cached.
   */
  unban(
    serverId: string,
    userId: string,
    removeBanIfCached = false
  ): Promise<MemberBan | null> {
    return this.client.bans.unban(serverId, userId, removeBanIfCached);
  }

  /**
   * Gets a list of the roles assigned to a member using the ID of the member.
   * @param serverId The ID of the server to get the member roles from.
   * @param userId The ID of the member to get the roles for.
   * @returns A Promise that resolves with an array of role IDs.
   */
  getRoles(serverId: string, userId: string): Promise<number[]> {
    return this.client.rest.router.roleMembership
      .roleMembershipReadMany({ serverId, userId })
      .then((data) => data.roleIds);
  }

  /**
   * Updates a member's nickname. Returns the new name.
   * @param serverId The ID of the server to update the member nickname for.
   * @param userId The ID of the member to update the nickname for.
   * @param newNickname The new nickname for the member.
   * @returns A Promise that resolves with the updated nickname.
   */
  updateNickname(
    serverId: string,
    userId: string,
    newNickname: string
  ): Promise<string> {
    return this.client.rest.router.members
      .memberNicknameUpdate({
        serverId,
        userId,
        requestBody: { nickname: newNickname },
      })
      .then((data) => data.nickname);
  }

  /**
   * Deletes a member's nickname.
   * @param serverId The ID of the server to delete the member nickname from.
   * @param userId The ID of the member to delete the nickname for.
   * @returns A Promise that resolves with no value upon completion.
   */
  resetNickname(serverId: string, userId: string): Promise<void> {
    return this.client.rest.router.members
      .memberNicknameDelete({ serverId, userId })
      .then(() => void 0);
  }

  /**
   * Awards XP to a member.
   * @param serverId The ID of the server to award XP on.
   * @param userId The ID of the member to award XP to.
   * @param amount The amount of XP to award.
   * @returns A Promise that resolves with the member's new total XP.
   */
  giveXP(serverId: string, userId: string, amount: number): Promise<number> {
    return this.client.rest.router.serverXp
      .serverXpForUserCreate({ serverId, userId, requestBody: { amount } })
      .then((data) => data.total);
  }

  /**
   * Fetch a member's social links.
   * @param serverId The ID of the server.
   * @param userId The ID of the member.
   * @param type The type of social link to fetch.
   * @returns A Promise that resolves with the member's social link.
   */
  fetchSocialLinks(
    serverId: string,
    userId: string,
    type: SocialLinkPayload["type"]
  ): Promise<SocialLinkPayload> {
    return this.client.rest.router.socialLinks
      .memberSocialLinkRead({ serverId, userId, socialLinkType: type })
      .then((data) => {
        const existingMember = this.cache.get(buildMemberKey(serverId, userId));
        if (this.shouldCacheSocialLinks)
          existingMember?.socialLinks.set(
            data.socialLink.type,
            data.socialLink
          );
        return data.socialLink;
      });
  }
}
