import GlobalManager from "./GlobalManager";

export default class RoleManager extends GlobalManager {
    /** Award XP to a role */
    awardRoleXP(roleId: number, amount: number) {
        // TODO: fix in rest by changing to number
        return this.client.rest.router.awardRoleXP(roleId.toString(), amount);
    }

    /** Assign role to member */
    assignRoleToMember(userId: string, roleId: number) {
        return this.client.rest.router.assignRoleToMember(userId, roleId);
    }

    /** Remove role to member */
    removeRoleFromMember(userId: string, roleId: number) {
        return this.client.rest.router.removeRoleFromMember(userId, roleId);
    }
}