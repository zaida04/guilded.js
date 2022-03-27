import type { WSTeamMemberUpdatedPayload, WSTeamMemberJoinedPayload, WSTeamMemberRemovedPayload } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { Member, User } from "../../structures";
import GatewayEventHandler from "./GatewayEventHandler";

export default class TeamMemberEventHandler extends GatewayEventHandler {
    teamMemberUpdated(data: WSTeamMemberUpdatedPayload): boolean {
        const existingMember = this.client.members.cache.get(`${data.d.serverId}:${data.d.userInfo.id}`);
        if(!existingMember) return this.client.emit(constants.clientEvents.TEAM_MEMBER_UPDATED, data.d, null);

        const cloneExistingMember = existingMember._clone();
        cloneExistingMember._update({ nickname: data.d.userInfo.nickname });
        return this.client.emit(constants.clientEvents.TEAM_MEMBER_UPDATED, cloneExistingMember, existingMember);
    }
    teamMemberJoined(data: WSTeamMemberJoinedPayload): boolean {
        const newMember = new Member(this.client, { ...data.d.member, serverId: data.d.serverId, id: data.d.member.user.id });
        const newUser = new User(this.client, data.d.member.user);

        this.client.members.cache.set(`${data.d.serverId}:${newMember.id}`, newMember);
        this.client.users.cache.set(newUser.id, newUser);
        return this.client.emit(constants.clientEvents.TEAM_MEMBER_JOINED, newMember);
    }
    teamMemberRemoved(data: WSTeamMemberRemovedPayload): boolean {
        if(this.client.options.cache?.removeMemberOnLeave) this.client.members.cache.delete(data.d.userId);
        const existingMember = this.client.members.cache.get(`${data.d.serverId}:${data.d.userId}`);
        return this.client.emit(constants.clientEvents.TEAM_MEMBER_REMOVED, existingMember ?? data.d);
    }
}
