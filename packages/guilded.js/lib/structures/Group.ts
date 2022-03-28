import { Base } from "./Base";

export class Group extends Base {
    /** Add member to group */
    addMember(memberId: string): Promise<void> {
        return this.client.groups.addMember(this.id, memberId);
    }

    /** Remove member from group */
    removeMember(memberId: string): Promise<void> {
        return this.client.groups.removeMember(this.id, memberId);
    }
}
