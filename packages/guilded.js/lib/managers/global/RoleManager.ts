import GlobalManager from "./GlobalManager";

export default class RoleManager extends GlobalManager {
    /** Award XP to a role */
    giveXP(serverId: string, roleId: number, amount: number) {
        // TODO: fix in rest by changing to number
        return this.client.rest.router.awardRoleXP(serverId, roleId.toString(), amount);
    }

    /** Assign role to member */
    addRole(memberId: string, roleId: number) {
        return this.client.rest.router.assignRoleToMember(memberId, roleId);
    }

    /** Remove role from member */
    removeRole(memberId: string, roleId: number) {
        return this.client.rest.router.removeRoleFromMember(memberId, roleId);
    }
}