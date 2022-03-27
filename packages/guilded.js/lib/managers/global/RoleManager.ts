import GlobalManager from "./GlobalManager";

export default class GlobalRoleManager extends GlobalManager {
    /** Award XP to a role */
    giveXP(serverId: string, roleId: number, amount: number): Promise<number> {
        return this.client.rest.router.awardRoleXP(serverId, roleId.toString(), amount).then(data => data.total);
    }

    /** Assign role to member */
    addRoleToMember(memberId: string, roleId: number): Promise<void> {
        return this.client.rest.router.assignRoleToMember(memberId, roleId).then(() => void 0);
    }

    /** Remove role from member */
    removeRoleFromMember(memberId: string, roleId: number): Promise<void> {
        return this.client.rest.router.removeRoleFromMember(memberId, roleId).then(() => void 0);
    }
}
