/* istanbul ignore file */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class GroupMembershipService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Add member to group
   * @returns void
   * @throws ApiError
   */
  public groupMembershipCreate({
    groupId,
    userId,
  }: {
    /**
     * Group ID to add the member to
     */
    groupId: string;
    /**
     * Member ID to add to the group
     */
    userId: string | "@me";
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/groups/{groupId}/members/{userId}",
      path: {
        groupId: groupId,
        userId: userId,
      },
    });
  }

  /**
   * Remove member from group
   * @returns void
   * @throws ApiError
   */
  public groupMembershipDelete({
    groupId,
    userId,
  }: {
    /**
     * Group ID to remove the member from
     */
    groupId: string;
    /**
     * Member ID to remove from the group
     */
    userId: string | "@me";
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/groups/{groupId}/members/{userId}",
      path: {
        groupId: groupId,
        userId: userId,
      },
    });
  }
}
