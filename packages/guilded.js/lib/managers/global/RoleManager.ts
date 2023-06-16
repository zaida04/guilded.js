import { RolesService, RolePayload } from "@guildedjs/api";
import { Role } from "../../structures";
import { CacheableStructManager } from "./CacheableStructManager";
import { OptionBody } from "../../typings";
import { Collection } from "@discordjs/collection";

/**
 * A class representing a global role manager. At the moment, we don't cache roles in this structure.
 */
export class GlobalRoleManager extends CacheableStructManager<number, Role> {

  /**
   * Create a new role. 
   * @param serverId The ID of the server.
   * @param options Role creation options.
   * @returns Promise that resolves with the newly created role.
   */
  create(
    serverId: string,
    options: OptionBody<RolesService["roleCreate"]>
  ): Promise<Role> {
    return this.client.rest.router.roles
      .roleCreate({ serverId, requestBody: options })
      .then((data) => {
        const newRole = new Role(this.client, data.role);
        this.cache.set(newRole.id, newRole);
        return newRole;
      });
  }

  /**
   * Fetch a role by it's ID
   * @param serverId The ID of the server.
   * @param roleId ID of the role to fetch.
   * @param force Whether or not to force a fetch from the API
   * @returns Promise that resolves with the fetched role.
   */
  fetch(serverId: string, roleId: number, force?: boolean): Promise<Role> {
    if (!force) {
      const existingRole = this.client.roles.cache.get(roleId);
      if (existingRole) return Promise.resolve(existingRole);
    }
    return this.client.rest.router.roles
      .roleRead({ serverId, roleId })
      .then((data) => {
        const fetchedRole = new Role(this.client, data.role);
        this.cache.set(fetchedRole.id, fetchedRole);
        return fetchedRole;
      });
  }

  /**
   * Fetch all roles in a given server
   * @param serverId The ID of the server.
   * @returns Promise that resolves with a Collection of fetched roles.
   */
  fetchMany(serverId: string): Promise<Collection<number, Role>> {
    return this.client.rest.router.roles
      .roleReadMany({ serverId })
      .then((data) => {
        const roles = new Collection<number, Role>();

        // Insert all fetched roles into cache
        for (const role of data.roles) {
          const fetchedRole = new Role(this.client, role);
          this.cache.set(fetchedRole.id, fetchedRole);
          roles.set(fetchedRole.id, fetchedRole);
        }

        return roles;
      });
  }

  /**
   * Update a role by ID
   * @param serverId The ID of the server.
   * @param roleId ID of the role to update.
   * @param options Role update options.
   * @returns Promise that resolves with the updated role.
   */
  update(
    serverId: string,
    roleId: number,
    options: OptionBody<RolesService["roleUpdate"]>
  ): Promise<Role> {
    return this.client.rest.router.roles
      .roleUpdate({ serverId, roleId, requestBody: options })
      .then((data) => {
        const existingRole = this.cache.get(roleId);
        if (existingRole) return existingRole._update(data.role);

        const newRole = new Role(this.client, data.role);
        this.cache.set(newRole.id, newRole);
        return newRole;
      });
  }

  /**
   * Delete a role by ID
   * @param serverId ID of the server to delete the role.
   * @param roleId ID of the role to delete.
   * @returns Promise that resolve with the cached deleted role, or void if the role isn't present in cache.
   */
  delete(serverId: string, roleId: number): Promise<Role | void> {
    return this.client.rest.router.roles
      .roleDelete({ serverId, roleId })
      .then(() => {
        const cachedRole = this.cache.get(roleId);
        return cachedRole ?? void 0;
      });
  }

  /**
   * Updates the permissions of a role.
   * @param serverId The ID of the server.
   * @param roleId The ID of the role.
   * @param options Role permission update options.
   * @returns A Promise that resolves with no value upon successful completion.
   */
  updatePermissions(
    serverId: string,
    roleId: number,
    options: OptionBody<RolesService["rolePermissionUpdate"]>
  ): Promise<void> {
    return this.client.rest.router.roles
      .rolePermissionUpdate({ serverId, roleId, requestBody: options })
      .then(() => void 0);
  }

  /**
   * Awards XP to a role.
   * @param serverId The ID of the server.
   * @param roleId The ID of the role.
   * @param amount The amount of XP to award.
   * @returns A Promise that resolves with the total XP awarded to the role.
   */
  giveXP(serverId: string, roleId: number, amount: number): Promise<void> {
    return this.client.rest.router.serverXp.serverXpForRoleCreate({
      serverId,
      roleId,
      requestBody: { amount },
    });
  }

  /**
   * Assigns a role to a member.
   * @param serverId The ID of the server.
   * @param memberId The ID of the member.
   * @param roleId The ID of the role.
   * @returns A Promise that resolves with no value upon successful completion.
   */
  addRoleToMember(
    serverId: string,
    userId: string,
    roleId: number
  ): Promise<void> {
    return this.client.rest.router.roleMembership
      .roleMembershipCreate({ serverId, userId, roleId })
      .then(() => void 0);
  }

  /**
   * Removes a role from a member.
   * @param serverId The ID of the server.
   * @param memberId The ID of the member.
   * @param roleId The ID of the role.
   * @returns A Promise that resolves with no value upon successful completion.
   */
  removeRoleFromMember(
    serverId: string,
    userId: string,
    roleId: number
  ): Promise<void> {
    return this.client.rest.router.roleMembership
      .roleMembershipDelete({ serverId, userId, roleId })
      .then(() => void 0);
  }
}
