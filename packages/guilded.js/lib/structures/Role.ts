import type Client from "../Client";
import Base from "./Base";

export default class Role extends Base<{ id: number; serverId: string }, number> {
    /** The ID of the server this role belongs to */
    serverId: string;

    constructor(client: Client, data: { id: number; serverId: string }) {
        super(client, data);
        this.serverId = data.serverId;
    }

    /** Award XP to a role */
    awardXP(amount: number) {
        return this.client.roles.giveXP(this.serverId, this.id, amount);
    }

    /** Assign role to member */
    assignToMember(memberId: string) {
        return this.client.roles.addRole(memberId, this.id);
    }

    /** Remove role to member */
    removeFromMember(memberId: string) {
        return this.client.roles.removeRole(memberId, this.id);
    }
}
