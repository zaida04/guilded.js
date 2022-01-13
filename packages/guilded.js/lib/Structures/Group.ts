import Client from "../Client";
import { Base } from "./Base";

export interface GroupPayload {
    id: string;
}

export default class Group extends Base {
    /** The group id */
    id: string;

    constructor(client: Client, payload: GroupPayload) {
        super(client);

        this.id = payload.id;
    }

    /** Add member to group */
    addMember(userId: string) {
        return this.client.addMemberToGroup(this.id, userId);
    }

    /** Remove member from group */
    removeMember(userId: string) {
        return this.client.removeMemberFromGroup(this.id, userId);
    }
}
