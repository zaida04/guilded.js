import Collection from "@discordjs/collection";
import { MemberBan } from "../../structures/Member";
import CacheableStructManager from "./CacheableStructManager";

export default class GlobalMemberBanManager extends CacheableStructManager<string, MemberBan> {
    /** Fetch a member ban in a server */
    fetch(serverId: string, userId: string) {
        return this.client.rest.router.getMemberBan(serverId, userId).then(data => {
            const newMemberBan = new MemberBan(this.client, { ...data.serverMemberBan, serverId })
            if(this.client.options.cache?.cacheMemberBans !== false) this.client.bans.cache.set(newMemberBan.id, newMemberBan);
            return newMemberBan;
        })
    }

    /** Fetch all bans in a server */
    fetchMany(serverId: string) {
        return this.client.rest.router.getMemberBans(serverId).then(data => {
            const newMemberBans = new Collection<string, MemberBan>();
            for(const ban of data.serverMemberBans) {
                const newMemberBan = new MemberBan(this.client, { serverId, ...ban });
                newMemberBans.set(newMemberBan.id, newMemberBan)
                if(this.client.options.cache?.cacheMemberBans !== false) this.client.bans.cache.set(newMemberBan.id, newMemberBan);
            }
            return newMemberBans;
        })
    }

    /** Ban a user from a server */
    ban(serverId: string, userId: string) {
        return this.client.rest.router.banMember(serverId, userId).then(data => {
            const newMemberBan = new MemberBan(this.client, { serverId, ...data.serverMemberBan });
            if(this.client.options.cache?.cacheMemberBans !== false) this.client.bans.cache.set(newMemberBan.id, newMemberBan);
            return newMemberBan;
        });
    }

    /** Unban a user from a server. Returns existing ban if cached. */
    unban(serverId: string, userId: string, removeBanIfCached = false) {
        return this.client.rest.router.unbanMember(serverId, userId).then(data => {
            const existingBan = this.client.bans.cache.get(`${serverId}:${userId}`);
            if(this.client.options.cache?.removeMemberOnLeave || removeBanIfCached) this.client.bans.cache.delete(`${serverId}:${userId}`);
            return existingBan ?? null;
        })
    }
}