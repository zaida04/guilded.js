import { GlobalManager } from "./GlobalManager";

/**
 * Manager for interacting with Groups on Guilded.
 */
export class GlobalGroupManager extends GlobalManager {
  /**
   * Adds a member to a group.
   * @param groupId The ID of the group.
   * @param userId The ID of the user to add.
   * @returns A Promise that resolves when the operation is complete.
   */
  addMember(groupId: string, userId: string): Promise<void> {
    return this.client.rest.router
      .addMemberToGroup(groupId, userId)
      .then(() => void 0);
  }

  /**
   * Removes a member from a group.
   * @param groupId The ID of the group.
   * @param userId The ID of the user to remove.
   * @returns A Promise that resolves when the operation is complete.
   */
  removeMember(groupId: string, userId: string): Promise<void> {
    return this.client.rest.router
      .removeMemberFromGroup(groupId, userId)
      .then(() => void 0);
  }
}
