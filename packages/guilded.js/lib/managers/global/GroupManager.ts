import { GlobalManager } from "./GlobalManager";

export class GlobalGroupManager extends GlobalManager {
    /** Add member to group */
    addMember(groupId: string, userId: string): Promise<void> {
        return this.client.rest.router.addMemberToGroup(groupId, userId).then(() => void 0);
    }

    /** Remove member from group */
    removeMember(groupId: string, userId: string): Promise<void> {
        return this.client.rest.router.removeMemberFromGroup(groupId, userId).then(() => void 0);
    }
}
