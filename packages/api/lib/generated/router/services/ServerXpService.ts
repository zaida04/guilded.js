/* istanbul ignore file */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ServerXpService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Award XP to a member
   * @returns any Success
   * @throws ApiError
   */
  public serverXpForUserCreate({
    serverId,
    userId,
    requestBody,
  }: {
    serverId: string;
    /**
     * Member ID to award XP to
     */
    userId: string | "@me";
    requestBody: {
      /**
       * The amount of XP to award
       */
      amount: number;
    };
  }): CancelablePromise<{
    /**
     * The total XP after this operation
     */
    total: number;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/servers/{serverId}/members/{userId}/xp",
      path: {
        serverId: serverId,
        userId: userId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Set a member's XP
   * @returns any Success
   * @throws ApiError
   */
  public serverXpForUserUpdate({
    serverId,
    userId,
    requestBody,
  }: {
    serverId: string;
    /**
     * Member ID to set XP to
     */
    userId: string | "@me";
    requestBody: {
      /**
       * The total XP to set on the user
       */
      total: number;
    };
  }): CancelablePromise<{
    /**
     * The total XP after this operation
     */
    total: number;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/servers/{serverId}/members/{userId}/xp",
      path: {
        serverId: serverId,
        userId: userId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Award XP to role
   * Award XP to all members with a particular role.
   * @returns void
   * @throws ApiError
   */
  public serverXpForRoleCreate({
    serverId,
    roleId,
    requestBody,
  }: {
    serverId: string;
    /**
     * Role ID to award XP to
     */
    roleId: number;
    requestBody: {
      /**
       * The amount of XP to award
       */
      amount: number;
    };
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "POST",
      url: "/servers/{serverId}/roles/{roleId}/xp",
      path: {
        serverId: serverId,
        roleId: roleId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
