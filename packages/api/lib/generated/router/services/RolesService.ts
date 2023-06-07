/* istanbul ignore file */
/* eslint-disable */
import type { Role } from "../models/Role";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class RolesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get a role
   * @returns any Success
   * @throws ApiError
   */
  public roleRead({
    serverId,
    roleId,
  }: {
    serverId: string;
    roleId: number;
  }): CancelablePromise<{
    role: Role;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/servers/{serverId}/roles/{roleId}",
      path: {
        serverId: serverId,
        roleId: roleId,
      },
    });
  }

  /**
   * Delete a role
   * @returns any Success
   * @throws ApiError
   */
  public roleDelete({
    serverId,
    roleId,
  }: {
    serverId: string;
    roleId: number;
  }): CancelablePromise<{
    role: Role;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/servers/{serverId}/roles/{roleId}",
      path: {
        serverId: serverId,
        roleId: roleId,
      },
    });
  }

  /**
   * Update a role
   * @returns any Success
   * @throws ApiError
   */
  public roleUpdate({
    serverId,
    roleId,
    requestBody,
  }: {
    serverId: string;
    roleId: number;
    requestBody: {
      /**
       * The role's name
       */
      name?: string;
      /**
       * If set, the role will be displayed separately in the channel member list
       */
      isDisplayedSeparately?: boolean;
      /**
       * If set, this roll will be self assigned
       */
      isSelfAssignable?: boolean;
      /**
       * If set, this role can be mentioned
       */
      isMentionable?: boolean;
      /**
       * Permissions must be a collection of valid permissions as defined in the [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) section
       */
      permissions?: Array<string>;
      /**
       * An array of integer values corresponding to the decimal RGB representation for a color. The first color is solid, and a second color indicates a gradient
       */
      colors?: Array<number>;
    };
  }): CancelablePromise<{
    role: Role;
  }> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/servers/{serverId}/roles/{roleId}",
      path: {
        serverId: serverId,
        roleId: roleId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Get roles
   * @returns any Success
   * @throws ApiError
   */
  public roleReadMany({ serverId }: { serverId: string }): CancelablePromise<{
    roles: Array<Role>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/servers/{serverId}/roles",
      path: {
        serverId: serverId,
      },
    });
  }

  /**
   * Create a role
   * @returns any Success
   * @throws ApiError
   */
  public roleCreate({
    serverId,
    requestBody,
  }: {
    serverId: string;
    requestBody: {
      /**
       * The role's name
       */
      name: string;
      /**
       * If set, the role will be displayed separately in the channel member list
       */
      isDisplayedSeparately?: boolean;
      /**
       * If set, this roll will be self assigned
       */
      isSelfAssignable?: boolean;
      /**
       * If set, this role can be mentioned
       */
      isMentionable?: boolean;
      /**
       * Permissions must be a collection of valid permissions as defined in the [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) section
       */
      permissions: Array<string>;
      /**
       * An array of integer values corresponding to the decimal RGB representation for a color. The first color is solid, and a second color indicates a gradient
       */
      colors?: Array<number>;
    };
  }): CancelablePromise<{
    role: Role;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/servers/{serverId}/roles",
      path: {
        serverId: serverId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Update a role permission
   * @returns any Success
   * @throws ApiError
   */
  public rolePermissionUpdate({
    serverId,
    roleId,
    requestBody,
  }: {
    serverId: string;
    roleId: number;
    requestBody: {
      /**
       * A JSON object of [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) with `true` or `false` values.
       */
      permissions: Record<string, any>;
    };
  }): CancelablePromise<{
    role: Role;
  }> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/servers/{serverId}/roles/{roleId}/permissions",
      path: {
        serverId: serverId,
        roleId: roleId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
