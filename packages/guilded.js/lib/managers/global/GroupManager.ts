import GlobalManager from "./GlobalManager";

export default class GroupManager extends GlobalManager {
    /** Add member to group */
    addMember(groupId: string, userId: string) {
        return this.client.rest.router.addMemberToGroup(groupId, userId);
    }

    /** Remove member from group */
    removeMember(groupId: string, userId: string) {
        return this.client.rest.router.removeMemberFromGroup(groupId, userId);
    }
}
