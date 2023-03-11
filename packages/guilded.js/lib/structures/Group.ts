import { Base } from "./Base";

/**
 * A group in a server in Guilded
 */
export class Group extends Base {
  /**
   * Adds a member to the group.
   * @param memberId The ID of the member to add.
   * @returns A Promise that resolves with no result on success.
   */
  addMember(memberId: string): Promise<void> {
    return this.client.groups.addMember(this.id, memberId);
  }

  /**
   * Removes a member from the group.
   * @param memberId The ID of the member to remove.
   * @returns A Promise that resolves with no result on success.
   */
  removeMember(memberId: string): Promise<void> {
    return this.client.groups.removeMember(this.id, memberId);
  }
}
