import type { WSTeamMemberUpdatedPayload, WSTeamMemberJoinedPayload, WSTeamMemberRemovedPayload } from "@guildedjs/guilded-api-typings";
import { Member, User } from "../../structures";
import GatewayEventHandler from "./GatewayEventHandler";

export default class TeamMemberEventHandler extends GatewayEventHandler {
    teamMemberUpdated(data: WSTeamMemberUpdatedPayload) {
        const existingMember = this.client.members.cache.get(`${data.d.serverId}:${data.d.userInfo.id}`);
        if(!existingMember) return this.client.emit("memberUpdated", data.d, null);

        const cloneExistingMember = existingMember._clone();
        cloneExistingMember._update({ nickname: data.d.userInfo.nickname });
        return this.client.emit("memberUpdated", cloneExistingMember, existingMember);
    }
    teamMemberJoined(data: WSTeamMemberJoinedPayload) {
        const newMember = new Member(this.client, { ...data.d.member, serverId: data.d.serverId, id: data.d.member.user.id });
        const newUser = new User(this.client, data.d.member.user);

        this.client.members.cache.set(`${data.d.serverId}:${newMember.id}`, newMember);
        this.client.users.cache.set(newUser.id, newUser);
        return this.client.emit("memberJoined", newMember);
    }
    teamMemberRemoved(data: WSTeamMemberRemovedPayload) {
        if(this.client.options.cache?.removeMemberOnLeave) this.client.members.cache.delete(data.d.userId);
        const existingMember = this.client.members.cache.get(`${data.d.serverId}:${data.d.userId}`);
        return this.client.emit("memberRemoved", existingMember ?? data.d);
    }
}
