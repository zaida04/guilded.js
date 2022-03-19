import { Base }  from "./Base";

export class Group extends Base {
    /** Add member to group */
    addMember(memberId: string) {
        return this.client.groups.addMember(this.id, memberId);
    }

    /** Remove member from group */
    removeMember(memberId: string) {
        return this.client.groups.removeMember(this.id, memberId);
    }
}
