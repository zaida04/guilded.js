import Client from "../Client";
import { BareStructureBaseData } from "../typings";
import Base from "./Base";
import { User } from "./User";

export default class Member extends Base<BareStructureBaseData> {
    /** The ID of the server this role belongs to */
    serverId: string;

    constructor(client: Client, data: BareStructureBaseData & { serverId: string }) {
        super(client, data);
        this.serverId = data.serverId;
    }

    get user() {
        // TODO: wait for user structure from Guilded
        return void 0;
    }

    /** Get a list of the roles assigned to a member using the id of the member. */
    getRoles() {
        return this.client.members.getRoles(this.serverId, this.id);
    }

    /** Update a member's nickname. */
    updateNickname(nickname: string) {
        return this.client.members.updateNicknames(this.serverId, this.id, nickname);
    }

    /** Reset a member's nickname */
    resetNickname() {
        return this.client.members.resetNickname(this.serverId, this.id);
    }

    /** Award XP to a member */
    awardXP(amount: number) {
        return this.client.members.giveXP(this.serverId, this.id, amount);
    }

    /** Add role to member */
    addRole(roleId: number) {
        return this.client.roles.addRole(this.id, roleId);
    }

    /** Remove role to member */
    removeRole(roleId: number) {
        return this.client.roles.removeRole(this.id, roleId);
    }
}
