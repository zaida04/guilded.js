import Client from "../Client";
import Base from "./Base";

export interface RolePayload {
    id: number;
}

export default class Role extends Base {
    /** The role id */
    id: number;

    constructor(client: Client, payload: RolePayload) {
        super(client);

        this.id = payload.id;
    }

    /** Award XP to a role */
    awardXP(amount: number) {
        return this.client.awardRoleXP(this.id, amount);
    }

    /** Assign role to member */
    assignToMember(userId: string) {
        return this.client.assignRoleToMember(userId, this.id);
    }

    /** Remove role to member */
    removeFromMember(userId: string) {
        return this.client.removeRoleFromMember(userId, this.id);
    }
}
