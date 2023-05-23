/* istanbul ignore file */

/* eslint-disable */
import { HttpRequest } from "../core/HttpRequest";
import type { Role } from "../models/Role";

export class RolesService {
  constructor(public readonly httpRequest: HttpRequest) {}

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
  }): Promise<{
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
   * Get roles
   * @returns any Success
   * @throws ApiError
   */
  public roleReadMany({ serverId }: { serverId: string }): Promise<{
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
}
