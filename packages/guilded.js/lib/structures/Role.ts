import type { Client } from "./Client";
import { Base } from "./Base";
import { RolePayload } from "@guildedjs/api";

/**
 * Represents a Guilded role in a server
 */
export class Role extends Base<{ id: number; serverId: string }, number> {
  /** The ID of the server this role belongs to */
  readonly serverId: string;

  /** The date this role was created */
  _createdAt: number;

  /** The date this role was last updated, if it was */
  _updatedAt: number | null;

  /** The name of this role */
  name: string;

  /** Whether this role is hoisted or not */
  isDisplayedSeparately: boolean;

  /** Whether this role is self assignable by members */
  isSelfAssignable: boolean;

  /** Whether this role is mentionable */
  isMentionable: boolean;

  /** The permissions this role has */
  permissions: string[];

  /** The colors belonging to this role. If a solid color role, then there will be just one color in this array. Otherwise, the first color is the solid color, and second is a gradient.  */
  colors: number[];

  /** The URL of the role's icon */
  icon: string | null;

  /** The position of this role on the hierarchy */
  position: number;

  /** Whether this is the default role for members */
  isBase: boolean;

  /** The bot user ID this role has been defined for. */
  botUserId: string | null;

  /**
   * @param client - The client instance
   * @param data - The data for this role
   */
  constructor(client: Client, data: RolePayload) {
    super(client, data);
    this.serverId = data.serverId;
    this._createdAt = Date.parse(data.createdAt);
    this._updatedAt = null;
    this.name = data.name;
    this.isDisplayedSeparately = data.isDisplayedSeparately ?? false;
    this.isSelfAssignable = data.isSelfAssignable ?? false;
    this.isMentionable = data.isMentionable ?? false;
    this.permissions = data.permissions;
    this.colors = data.colors ?? [];
    this.icon = data.icon ?? null;
    this.position = data.position;
    this.isBase = data.isBase ?? false;
  }

  _update(data: RolePayload) {
    if ("updatedAt" in data) {
      this._updatedAt = data.updatedAt ? Date.parse(data.updatedAt) : null;
    }
  }

  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  /**
   * Returns the date and time the message was last updated, if relevant.
   */
  get updatedAt(): Date | null {
    return this._updatedAt ? new Date(this._updatedAt) : null;
  }

  /**
   * Award XP to a role
   * @param amount - The amount of XP to award to the role
   * @returns A Promise that resolves to the new total XP of the role
   */
  giveXP(amount: number): Promise<void> {
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
