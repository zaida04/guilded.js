/* istanbul ignore file */

/* eslint-disable */
import type { ServerMember } from "../models/ServerMember";
import type { ServerMemberSummary } from "../models/ServerMemberSummary";
import { HttpRequest } from "../core/HttpRequest";

export class MembersService {
  constructor(public readonly httpRequest: HttpRequest) {}

  /**
   * Update a member's nickname
   * @returns any Success
   * @throws ApiError
   */
  public memberNicknameUpdate({
    serverId,
    userId,
    requestBody,
  }: {
    serverId: string;
    /**
     * The ID of the user to update nickname for
     */
    userId: string | "@me";
    requestBody: {
      /**
       * The nickname to assign to the member
       */
      nickname: string;
    };
  }): Promise<{
    /**
     * The nickname that was assigned to the member
     */
    nickname: string;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/servers/{serverId}/members/{userId}/nickname",
      path: {
        serverId: serverId,
        userId: userId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Delete a member's nickname
   * @returns void
   * @throws ApiError
   */
  public memberNicknameDelete({
    serverId,
    userId,
  }: {
    serverId: string;
    /**
     * The ID of the user to remove nickname from
     */
    userId: string | "@me";
  }): Promise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/servers/{serverId}/members/{userId}/nickname",
      path: {
        serverId: serverId,
        userId: userId,
      },
    });
  }

  /**
   * Get a server member
   * @returns any Success
   * @throws ApiError
   */
  public serverMemberRead({
    serverId,
    userId,
  }: {
    serverId: string;
    userId: string | "@me";
  }): Promise<{
    member: ServerMember;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/servers/{serverId}/members/{userId}",
      path: {
        serverId: serverId,
        userId: userId,
      },
    });
  }

  /**
   * Kick a server member
   * This route can be used to leave servers by passing in your own user ID or `@me` for `userId`
   * @returns void
   * @throws ApiError
   */
  public serverMemberDelete({
    serverId,
    userId,
  }: {
    /**
     * The ID of the server to kick the user from
     */
    serverId: string;
    /**
     * The ID of the user to kick. If the value provided here is your own user's ID, the request will attempt to make you leave the server
     */
    userId: string | "@me";
  }): Promise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/servers/{serverId}/members/{userId}",
      path: {
        serverId: serverId,
        userId: userId,
      },
    });
  }

  /**
   * Get members of a server
   * Results returned will be ordered ascending by the member's `joinedAt`
   * @returns any Success
   * @throws ApiError
   */
  public serverMemberReadMany({ serverId }: { serverId: string }): Promise<{
    members: Array<ServerMemberSummary>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/servers/{serverId}/members",
      path: {
        serverId: serverId,
      },
    });
  }
}
