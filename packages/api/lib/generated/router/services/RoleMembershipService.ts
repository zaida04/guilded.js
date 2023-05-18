/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { HttpRequest } from "../core/HttpRequest";

export class RoleMembershipService {

	constructor(public readonly httpRequest: HttpRequest) { }

	/**
	 * Assign role to member
	 * @returns void 
	 * @throws ApiError
	 */
	public roleMembershipCreate({
		serverId,
		userId,
		roleId,
	}: {
		serverId: string,
		/**
		 * The ID of the member that the role should be assigned to
		 */
		userId: (string | '@me'),
		/**
		 * The role ID to apply to the user
		 */
		roleId: number,
	}): Promise<void> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/servers/{serverId}/members/{userId}/roles/{roleId}',
			path: {
				'serverId': serverId,
				'userId': userId,
				'roleId': roleId,
			},
		});
	}

	/**
	 * Remove role from member
	 * @returns void 
	 * @throws ApiError
	 */
	public roleMembershipDelete({
		serverId,
		userId,
		roleId,
	}: {
		serverId: string,
		/**
		 * The ID of the member that the role should be removed from
		 */
		userId: (string | '@me'),
		/**
		 * The role ID to remove from the user
		 */
		roleId: number,
	}): Promise<void> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/servers/{serverId}/members/{userId}/roles/{roleId}',
			path: {
				'serverId': serverId,
				'userId': userId,
				'roleId': roleId,
			},
		});
	}

	/**
	 * Get member roles
	 * Get a list of the roles assigned to a member
	 * @returns any Success
	 * @throws ApiError
	 */
	public roleMembershipReadMany({
		serverId,
		userId,
	}: {
		serverId: string,
		/**
		 * The ID of the member to obtain roles from
		 */
		userId: (string | '@me'),
	}): Promise<{
		/**
		 * The IDs of the roles that the member currently has
		 */
		roleIds: Array<number>;
	}> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/servers/{serverId}/members/{userId}/roles',
			path: {
				'serverId': serverId,
				'userId': userId,
			},
		});
	}

}
