import type {
	WSServerMemberUpdatedPayload,
	WSServerMemberJoinedPayload,
	WSServerMemberRemovedPayload,
	WSServerMemberBannedPayload,
	WSServerMemberUnbannedPayload,
} from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { Member, MemberBan, User } from "../../structures";
import { GatewayEventHandler } from "./GatewayEventHandler";
import { buildMemberKey } from "../../util";

export class ServerMemberEventHandler extends GatewayEventHandler {
	serverMemberUpdated(data: WSServerMemberUpdatedPayload): boolean {
		const member = this.client.members.cache.get(buildMemberKey(data.d.serverId, data.d.userInfo.id));
		if (!member) return this.client.emit(constants.clientEvents.MEMBER_UPDATED, data.d, null);

		const oldMember = member._clone();
		member._update({ nickname: data.d.userInfo.nickname });
		return this.client.emit(constants.clientEvents.MEMBER_UPDATED, member, oldMember);
	}
	serverMemberJoined(data: WSServerMemberJoinedPayload): boolean {
		const newMember = new Member(this.client, { ...data.d.member, serverId: data.d.serverId, id: data.d.member.user.id });
		const newUser = new User(this.client, data.d.member.user);

		this.client.members.cache.set(buildMemberKey(data.d.serverId, data.d.member.user.id), newMember);
		this.client.users.cache.set(newUser.id, newUser);
		if (data.d.member.user.id === this.client.user!.id) this.client.emit(constants.clientEvents.SERVER_CREATED, { serverId: data.d.serverId });
		return this.client.emit(constants.clientEvents.MEMBER_JOINED, newMember);
	}
	serverMemberRemoved(data: WSServerMemberRemovedPayload): boolean {
		const memberKey = buildMemberKey(data.d.serverId, data.d.userId);
		const existingMember = this.client.members.cache.get(memberKey);
		if (this.client.options.cache?.removeMemberOnLeave) this.client.members.cache.delete(memberKey);
		return this.client.emit(
			constants.clientEvents.MEMBER_REMOVED,
			existingMember?._update({ kicked: data.d.isKick, banned: data.d.isBan }) ?? data.d,
		);
	}
	serverMemberBanned(data: WSServerMemberBannedPayload): boolean {
		const newMemberBan = new MemberBan(this.client, { serverId: data.d.serverId, ...data.d.serverMemberBan });
		if (this.client.options.cache?.cacheMemberBans !== false)
			this.client.bans.cache.set(buildMemberKey(newMemberBan.serverId, newMemberBan.target.id), newMemberBan);
		return this.client.emit(constants.clientEvents.MEMBER_BANNED, newMemberBan);
	}
	serverMemberUnbanned(data: WSServerMemberUnbannedPayload): boolean {
		const memberKey = buildMemberKey(data.d.serverId, data.d.serverMemberBan.user.id);
		const existingMemberBan = this.client.bans.cache.get(memberKey);
		if (existingMemberBan && this.client.options.cache?.removeMemberBanOnUnban) this.client.bans.cache.delete(existingMemberBan.id);
		const existingMember = this.client.members.cache.get(memberKey);
		if (existingMember) existingMember._update({ banned: false });
		return this.client.emit(constants.clientEvents.MEMBER_UNBANNED, existingMemberBan ?? data.d);
	}
}
