import Client from "../Client";
import Base from "./Base";
import { User } from "./User";

export interface MemberPayload {
    user: {
        id: string;
    };
}

export default class Member extends Base {
    user: User;

    constructor(client: Client, payload: MemberPayload) {
        super(client);

        const user = new User(client, payload.user);
        client.users.set(user.id, user);

        this.user = user;
    }

    /** The user id */
    get id() {
        return this.user.id;
    }

    /** Get a list of the roles assigned to a member using the id of the member. */
    getRoles() {
        return this.client.getMemberRoles(this.id);
    }

    /** Update a member's nickname. */
    updateNickname(nickname: string) {
        return this.client.updateMemberNickname(this.id, nickname);
    }

    /** Delete a member's nickname */
    deleteNickname() {
        return this.client.deleteMemberNickname(this.id);
    }

    /** Award XP to a member */
    awardXP(amount: number) {
        return this.client.awardMemberXP(this.id, amount);
    }

    /** Add member to group */
    addToGroup(groupId: string) {
        return this.client.addMemberToGroup(groupId, this.id);
    }

    /** Remove member from group */
    removeFromGroup(groupId: string) {
        return this.client.removeMemberFromGroup(groupId, this.id);
    }

    /** Assign role to member */
    assignRole(roleId: number) {
        return this.client.assignRoleToMember(this.id, roleId);
    }

    /** Remove role to member */
    removeRole(roleId: number) {
        return this.client.removeRoleFromMember(this.id, roleId);
    }
}
