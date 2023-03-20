import type { Client } from "./Client";
import { Base } from "./Base";
import type {
  UpgradedServerMemberBanPayload,
  UpgradedServerMemberPayload,
  UpgradedServerMemberSummaryPayload,
} from "../typings";
import type {
  ServerMemberPayload,
  SocialLink,
  UserSocialLink,
  UserSummaryPayload,
} from "@guildedjs/guilded-api-typings";
import type { User } from "./User";
import { buildMemberKey } from "../util";
import { Collection } from "@discordjs/collection";

export class Member extends Base<UpgradedServerMemberPayload> {
  /** The ID of the server this role belongs to */
  readonly serverId: string;
  /** The nickname for this member */
  nickname: string | null = null;
  /** Date this member joined */
  _joinedAt: number | null;
  /** Roles this member has by ID (TODO: role object when Guilded API has one) */
  roleIds: number[] = [];
  /** Whether this member has been kicked */
  kicked: boolean;
  /** Whether this member has been banned */
  banned: boolean;
  /** Whether this member owns the server */
  isOwner: boolean;
  /** Cached social links of this member */
  socialLinks: Collection<UserSocialLink, SocialLink>;

  constructor(client: Client, data: UpgradedServerMemberPayload) {
    super(client, data);
    this.serverId = data.serverId;
    this._joinedAt = Date.parse(data.joinedAt);
    this.kicked = false;
    this.banned = false;
    this.isOwner = false;
    this.socialLinks = new Collection();

    this._update(data);
  }

  get joinedAt(): Date | null {
    return this._joinedAt ? new Date(this._joinedAt) : null;
  }

  _update(
    data: Partial<ServerMemberPayload & { kicked: boolean; banned: boolean }>
  ): this {
    if ("nickname" in data) {
      this.nickname = data.nickname ?? null;
    }

    if ("roleIds" in data && typeof data.roleIds !== "undefined") {
      this.roleIds = data.roleIds;
    }

    if ("kicked" in data && typeof data.kicked !== "undefined") {
      this.kicked = data.kicked;
    }

    if ("banned" in data && typeof data.banned !== "undefined") {
      this.banned = data.banned;
    }

    if ("isOwner" in data && typeof data.isOwner !== "undefined") {
      this.isOwner = data.isOwner;
    }

    return this;
  }

  /**
   * Get the user associated with this member.
   * @returns The user associated with this member or null if the user is not cached.
   */
  get user(): User | null {
    return this.client.users.cache.get(this.id) ?? null;
  }

  /**
   * The username of this member.
   * @returns The username of this member or null if the user is not cached.
   */
  get username(): string | null {
    return this.user?.name ?? null;
  }

  /**
   * Either the nickname or the username associated with this member.
   * @returns The nickname of this member or their username if they have no nickname, or null if the user does not exist.
   */
  get displayName(): string | null {
    return this.nickname ?? this.username;
  }

  /**
   * Get a list of the roles assigned to this member.
   * @returns A Promise that resolves with an array of role IDs assigned to this member.
   */
  getRoles(): Promise<number[]> {
    return this.client.members.getRoles(this.serverId, this.id);
  }

  /**
   * Update this member's nickname.
   * @param nickname - The new nickname for the member.
   * @returns A Promise that resolves with the new nickname for the member.
   */
  updateNickname(nickname: string): Promise<string> {
    return this.client.members.updateNickname(this.serverId, this.id, nickname);
  }

  /**
   * Reset this member's nickname.
   * @returns A Promise that resolves once the member's nickname has been reset.
   */
  resetNickname(): Promise<void> {
    return this.client.members.resetNickname(this.serverId, this.id);
  }

  /**
   * Award XP to this member.
   * @param amount - The amount of XP to award to the member.
   * @returns A Promise that resolves with the new total amount of XP the member has.
   */
  awardXP(amount: number): Promise<number> {
    return this.client.members.giveXP(this.serverId, this.id, amount);
  }

  /**
   * Add role to this member.
   * @param roleId - The ID of the role to add to the member.
   * @returns A Promise that resolves once the role has been added to the member.
   */
  addRole(roleId: number): Promise<void> {
    return this.client.roles.addRoleToMember(this.serverId, this.id, roleId);
  }

  /**
   * Remove role from this member.
   * @param roleId - The ID of the role to remove from the member.
   * @returns A Promise that resolves once the role has been removed from the member.
   */
  removeRole(roleId: number): Promise<void> {
    return this.client.roles.removeRoleFromMember(
      this.serverId,
      this.id,
      roleId
    );
  }

  /**
   * Kick this user from the server.
   * @returns A Promise that resolves with the kicked member or null if the user is not a member of the server.
   */
  kick(): Promise<Member | null> {
    return this.client.members.kick(this.serverId, this.id);
  }

  /**
   * Ban this user
   * @returns A Promise that resolved to the created member ban.
   */
  ban(): Promise<MemberBan> {
    return this.client.bans.ban(this.serverId, this.id);
  }
}

/** A partial summary representation of a member. Can fetch this member to get full data */
export class PartialMember extends Base<UpgradedServerMemberSummaryPayload> {
  /** The ID of the server this role belongs to */
  readonly serverId: string;
  /** The user information of this member */
  readonly user: UserSummaryPayload;
  /** Roles this member has by ID (TODO: role object when Guilded API has one) */
  readonly roleIds: number[] = [];

  constructor(client: Client, data: UpgradedServerMemberSummaryPayload) {
    super(client, data);
    this.serverId = data.serverId;
    this.user = data.user;
    this.roleIds = data.roleIds;
  }

  /**
   * Fetch the full member object of this partial member
   * @returns A promise containing the resolved full member.
   */
  fetch(): Promise<Member> {
    return this.client.members.fetch(this.serverId, this.user.id);
  }
}

/**
 * Represents a banned member.
 */
export class MemberBan extends Base<UpgradedServerMemberBanPayload> {
  /** Id this ban was created in */
  serverId: string;
  /** Date this ban was created */
  _createdAt: number;
  /** The ID of user who banned this person */
  createdById: string;
  /** The reason this user was banned */
  reason: string | null;
  /** Information about the target user */
  target: UserSummaryPayload;

  /**
   * Creates a new instance of `MemberBan`.
   * @param client - The Guilded client instance.
   * @param data - The data for this member ban.
   */
  constructor(client: Client, data: UpgradedServerMemberBanPayload) {
    const transformedBanId = buildMemberKey(data.serverId, data.user.id);
    super(client, { ...data, id: transformedBanId });

    this.serverId = data.serverId;
    this._createdAt = Date.parse(data.createdAt);
    this.createdById = data.createdBy;
    this.target = data.user;
    this.reason = data.reason ?? null;
  }

  /**
   * Gets the creation date of this ban.
   * @returns The creation date of this ban.
   */
  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  /**
   * Gets the user who banned this member.
   * @returns The user who banned this member, or `null` if the user is not cached.
   */
  get author(): User | null {
    return this.client.users.cache.get(this.createdById) ?? null;
  }

  /**
   * Removes this ban.
   * @returns A Promise that resolves to the unbanned member or `null` if the member is not cached.
   */
  unban(): Promise<MemberBan | null> {
    return this.client.bans.unban(this.serverId, this.target.id);
  }
}
