import Collection from "@discordjs/collection";
import { MemberBan } from "../../structures/Member";
import { CacheableStructManager } from "./CacheableStructManager";
import { buildMemberKey } from "../../util";

export class GlobalGuildBanManager extends CacheableStructManager<string, MemberBan> {
    /** Fetch a member ban in a server */
    fetch(serverId: string, userId: string): Promise<MemberBan> {
        return this.client.rest.router.getMemberBan(serverId, userId).then((data) => {
            const newMemberBan = new MemberBan(this.client, { ...data.serverMemberBan, serverId });
            if (this.client.options.cache?.cacheMemberBans !== false) this.client.bans.cache.set(newMemberBan.id, newMemberBan);
            return newMemberBan;
        });
    }

    /** Fetch all bans in a server */
    fetchMany(serverId: string): Promise<Collection<string, MemberBan>> {
        return this.client.rest.router.getMemberBans(serverId).then((data) => {
            const newMemberBans = new Collection<string, MemberBan>();
            for (const ban of data.serverMemberBans) {
                const newMemberBan = new MemberBan(this.client, { serverId, ...ban });
                newMemberBans.set(newMemberBan.id, newMemberBan);
                if (this.client.options.cache?.cacheMemberBans !== false) this.client.bans.cache.set(newMemberBan.id, newMemberBan);
            }
            return newMemberBans;
        });
    }

    /** Ban a user from a server */
    ban(serverId: string, userId: string): Promise<MemberBan> {
        return this.client.rest.router.banMember(serverId, userId).then((data) => {
            const newMemberBan = new MemberBan(this.client, { serverId, ...data.serverMemberBan });
            if (this.client.options.cache?.cacheMemberBans !== false) this.client.bans.cache.set(newMemberBan.id, newMemberBan);
            return newMemberBan;
        });
    }

    /** Unban a user from a server. Returns existing ban if cached. */
    unban(serverId: string, userId: string, removeBanIfCached = false): Promise<MemberBan | null> {
        return this.client.rest.router.unbanMember(serverId, userId).then((data) => {
            const memberKey = buildMemberKey(serverId, userId);
            const existingBan = this.client.bans.cache.get(memberKey);
            if (this.client.options.cache?.removeMemberOnLeave || removeBanIfCached) this.client.bans.cache.delete(memberKey);
            return existingBan ?? null;
        });
    }
}
