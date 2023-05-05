import { constants } from "../../constants";
import { Member, MemberBan, User } from "../../structures";
import { GatewayEventHandler } from "./GatewayEventHandler";
import { buildMemberKey } from "../../util";
import { WSPacket } from "@guildedjs/guilded-api-typings";

export class ServerMemberEventHandler extends GatewayEventHandler {
	serverMemberUpdated(data: WSPacket<"ServerMemberUpdated">): boolean {
		const {
			d: {
				userInfo: { id, nickname },
				serverId,
			},
		} = data;

		const member = this.client.members.cache.get(buildMemberKey(serverId, id));

		const oldMember = member?._clone();
		member?._update({ nickname: data.d.userInfo.nickname });

		return this.client.emit(constants.clientEvents.MEMBER_UPDATED, {
			serverId,
			userId: id,
			nickname: nickname ?? null,
			oldMember: oldMember ?? null,
		});
	}
	serverMemberJoined(data: WSPacket<"ServerMemberJoined">): boolean {
		const newMember = new Member(this.client, {
			...data.d.member,
			serverId: data.d.serverId,
			id: data.d.member.user.id,
		});
		const newUser = new User(this.client, data.d.member.user);

		this.client.members.cache.set(
			buildMemberKey(data.d.serverId, data.d.member.user.id),
			newMember
		);
		this.client.users.cache.set(newUser.id, newUser);
		if (data.d.member.user.id === this.client.user!.id)
			this.client.emit(constants.clientEvents.SERVER_CREATED, {
				serverId: data.d.serverId,
			});
		return this.client.emit(constants.clientEvents.MEMBER_JOINED, newMember);
	}
	serverMemberRemoved(data: WSPacket<"ServerMemberRemoved">): boolean {
		const memberKey = buildMemberKey(data.d.serverId, data.d.userId);
		const existingMember = this.client.members.cache.get(memberKey);
		if (this.client.options.cache?.removeMemberOnLeave)
			this.client.members.cache.delete(memberKey);

		existingMember?._update({
			kicked: data.d.isKick,
			banned: data.d.isBan,
		});
		return this.client.emit(constants.clientEvents.MEMBER_REMOVED, data.d);
	}
	serverMemberBanned(data: WSPacket<"ServerMemberBanned">): boolean {
		const newMemberBan = new MemberBan(this.client, {
			serverId: data.d.serverId,
			...data.d.serverMemberBan,
		});
		if (this.client.options.cache?.cacheMemberBans !== false)
			this.client.bans.cache.set(
				buildMemberKey(newMemberBan.serverId, newMemberBan.target.id),
				newMemberBan
			);
		return this.client.emit(constants.clientEvents.MEMBER_BANNED, newMemberBan);
	}
	serverMemberUnbanned(data: WSPacket<"ServerMemberUnbanned">): boolean {
		const {
			d: {
				serverId,
				serverMemberBan: { createdAt, createdBy, reason, user },
			},
		} = data;

		const memberKey = buildMemberKey(serverId, user.id);
		const existingMemberBan = this.client.bans.cache.get(memberKey);
		if (existingMemberBan && this.client.options.cache?.removeMemberBanOnUnban)
			this.client.bans.cache.delete(existingMemberBan.id);
		const existingMember = this.client.members.cache.get(memberKey);
		if (existingMember) existingMember._update({ banned: false });

		return this.client.emit(constants.clientEvents.MEMBER_UNBANNED, {
			createdAt,
			createdBy,
			reason,
			user,
			serverId,
		});
	}
	serverMemberSocialLinkCreated(
		data: WSPacket<"ServerMemberSocialLinkCreated">
	): boolean {
		const {
			d: { serverId, socialLink },
		} = data;

		const existingMember = this.client.members.cache.get(
			buildMemberKey(serverId, socialLink.userId)
		);
		if (this.client.members.shouldCacheSocialLinks)
			existingMember?.socialLinks.set(socialLink.type, socialLink);

		return this.client.emit(
			constants.clientEvents.MEMBER_SOCIAL_LINK_CREATED,
			serverId,
			socialLink
		);
	}
	serverMemberSocialLinkUpdated(
		data: WSPacket<"ServerMemberSocialLinkUpdated">
	): boolean {
		const {
			d: { serverId, socialLink },
		} = data;

		const existingMember = this.client.members.cache.get(
			buildMemberKey(serverId, socialLink.userId)
		);
		if (this.client.members.shouldCacheSocialLinks)
			existingMember?.socialLinks.set(socialLink.type, socialLink);

		return this.client.emit(
			constants.clientEvents.MEMBER_SOCIAL_LINK_UPDATED,
			serverId,
			socialLink
		);
	}
	serverMemberSocialLinkDeleted(
		data: WSPacket<"ServerMemberSocialLinkDeleted">
	): boolean {
		const {
			d: { serverId, socialLink },
		} = data;

		const existingMember = this.client.members.cache.get(
			buildMemberKey(serverId, socialLink.userId)
		);
		if (this.client.members.shouldCacheSocialLinks)
			existingMember?.socialLinks.delete(socialLink.type);

		return this.client.emit(
			constants.clientEvents.MEMBER_SOCIAL_LINK_DELETED,
			serverId,
			socialLink
		);
	}
}
