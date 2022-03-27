import type Client from "./Client";
import { Base }  from "./Base";

export class Role extends Base<{ id: number; serverId: string }, number> {
    /** The ID of the server this role belongs to */
    readonly serverId: string;

    constructor(client: Client, data: { id: number; serverId: string }) {
        super(client, data);
        this.serverId = data.serverId;
    }

    /** Award XP to a role */
    awardXP(amount: number): Promise<number> {
        return this.client.roles.giveXP(this.serverId, this.id, amount);
    }

    /** Assign role to member */
    assignToMember(memberId: string): Promise<void> {
        return this.client.roles.addRoleToMember(memberId, this.id);
    }

    /** Remove role to member */
    removeFromMember(memberId: string): Promise<void> {
        return this.client.roles.removeRoleFromMember(memberId, this.id);
    }
}
