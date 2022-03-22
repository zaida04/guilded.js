import Client from "./Client";
import { Base }  from "./Base";
import type { UpgradedTeamMemberPayload } from "../typings";
import type { TeamMemberPayload } from "@guildedjs/guilded-api-typings";

export class Member extends Base<UpgradedTeamMemberPayload> {
    /** The ID of the server this role belongs to */
    serverId: string;
    /** The nickname for this member */
    nickname: string | null = null;
    /** Date this member joined */
    joinedAt: Date | null;
    /** Roles this member has by ID (TODO: role object when Guilded API has one) */
    roleIds: number[] = [];

    constructor(client: Client, data: UpgradedTeamMemberPayload) {
        super(client, data);
        this.serverId = data.serverId;
        this.joinedAt = new Date(data.joinedAt);

        this._update(data);
    }

    _update(data: Partial<TeamMemberPayload>) {
        if ("nickname" in data) {
            this.nickname = data.nickname ?? null;
        }

        if("roleIds" in data && typeof data.roleIds !== "undefined") {
            this.roleIds = data.roleIds;
        }
    }

    /** Get the user associated with this member */
    get user() {
        return this.client.users.cache.get(this.id);
    }

    /** Get a list of the roles assigned to this member. */
    getRoles() {
        return this.client.members.getRoles(this.serverId, this.id);
    }

    /** Update this member's nickname. */
    updateNickname(nickname: string) {
        return this.client.members.updateNicknames(this.serverId, this.id, nickname);
    }

    /** Reset this member's nickname */
    resetNickname() {
        return this.client.members.resetNickname(this.serverId, this.id);
    }

    /** Award XP to this member */
    awardXP(amount: number) {
        return this.client.members.giveXP(this.serverId, this.id, amount);
    }

    /** Add role to this member */
    addRole(roleId: number) {
        return this.client.roles.addRole(this.id, roleId);
    }

    /** Remove role from this member */
    removeRole(roleId: number) {
        return this.client.roles.removeRole(this.id, roleId);
    }

    /** Kick this user */
    kick() {
        return this.client.members.kick(this.serverId, this.id);
    }
}
