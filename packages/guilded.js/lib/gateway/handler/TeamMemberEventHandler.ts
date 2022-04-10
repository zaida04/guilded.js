import type {
    WSTeamMemberUpdatedPayload,
    WSTeamMemberJoinedPayload,
    WSTeamMemberRemovedPayload,
    WSTeamMemberBannedPayload,
    WSTeamMemberUnbannedPayload,
} from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { Member, MemberBan, User } from "../../structures";
import GatewayEventHandler from "./GatewayEventHandler";

export default class TeamMemberEventHandler extends GatewayEventHandler {
    teamMemberUpdated(data: WSTeamMemberUpdatedPayload): boolean {
        const existingMember = this.client.members.cache.get(TeamMemberEventHandler.buildMemberKey(data.d.serverId, data.d.userInfo.id));
        if (!existingMember) return this.client.emit(constants.clientEvents.TEAM_MEMBER_UPDATED, data.d, null);

        const cloneExistingMember = existingMember._clone();
        cloneExistingMember._update({ nickname: data.d.userInfo.nickname });
        return this.client.emit(constants.clientEvents.TEAM_MEMBER_UPDATED, cloneExistingMember, existingMember);
    }
    teamMemberJoined(data: WSTeamMemberJoinedPayload): boolean {
        const newMember = new Member(this.client, { ...data.d.member, serverId: data.d.serverId, id: data.d.member.user.id });
        const newUser = new User(this.client, data.d.member.user);

        this.client.members.cache.set(TeamMemberEventHandler.buildMemberKey(data.d.serverId, data.d.member.user.id), newMember);
        this.client.users.cache.set(newUser.id, newUser);
        return this.client.emit(constants.clientEvents.TEAM_MEMBER_JOINED, newMember);
    }
    teamMemberRemoved(data: WSTeamMemberRemovedPayload): boolean {
        if (this.client.options.cache?.removeMemberOnLeave) this.client.members.cache.delete(data.d.userId);
        const existingMember = this.client.members.cache.get(TeamMemberEventHandler.buildMemberKey(data.d.serverId, data.d.userId));
        return this.client.emit(
            constants.clientEvents.TEAM_MEMBER_REMOVED,
            existingMember?._update({ kicked: data.d.isKick, banned: data.d.isBan }) ?? data.d,
        );
    }
    teamMemberBanned(data: WSTeamMemberBannedPayload): boolean {
        const newMemberBan = new MemberBan(this.client, { serverId: data.d.serverId, ...data.d.serverMemberBan });
        if (this.client.options.cache?.cacheMemberBans !== false)
            this.client.bans.cache.set(TeamMemberEventHandler.buildMemberKey(newMemberBan.serverId, newMemberBan.target.id), newMemberBan);
        return this.client.emit(constants.clientEvents.TEAM_MEMBER_BANNED, newMemberBan);
    }
    teamMemberUnbanned(data: WSTeamMemberUnbannedPayload): boolean {
        const existingMemberBan = this.client.bans.cache.get(TeamMemberEventHandler.buildMemberKey(data.d.serverId, data.d.serverMemberBan.user.id));
        if (existingMemberBan && this.client.options.cache?.removeMemberOnLeave) this.client.bans.cache.delete(existingMemberBan.id);
        return this.client.emit(constants.clientEvents.TEAM_MEMBER_UNBANNED, existingMemberBan ?? data.d);
    }

    static buildMemberKey(serverId: string, userId: string) {
        return `${serverId}:${userId}`;
    }
}
