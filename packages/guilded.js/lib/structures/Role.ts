import type { Client } from "./Client";
import { Base } from "./Base";

/**
 * Represents a Guilded role in a server
 */
export class Role extends Base<{ id: number; serverId: string }, number> {
  /** The ID of the server this role belongs to */
  readonly serverId: string;

  /**
   * @param client - The client instance
   * @param data - The data for this role
   */
  constructor(client: Client, data: { id: number; serverId: string }) {
    super(client, data);
    this.serverId = data.serverId;
  }

  /**
   * Award XP to a role
   * @param amount - The amount of XP to award to the role
   * @returns A Promise that resolves to the new total XP of the role
   */
  awardXP(amount: number): Promise<number> {
    return this.client.roles.giveXP(this.serverId, this.id, amount);
  }

  /**
   * Assign role to member
   * @param memberId - The ID of the member to assign the role to
   * @returns A Promise that resolves when the role has been assigned to the member
   */
  assignToMember(memberId: string): Promise<void> {
    return this.client.roles.addRoleToMember(this.serverId, memberId, this.id);
  }

  /**
   * Remove role from member
   * @param memberId - The ID of the member to remove the role from
   * @returns A Promise that resolves when the role has been removed from the member
   */
  removeFromMember(memberId: string): Promise<void> {
    return this.client.roles.removeRoleFromMember(
      this.serverId,
      memberId,
      this.id
    );
  }
}
