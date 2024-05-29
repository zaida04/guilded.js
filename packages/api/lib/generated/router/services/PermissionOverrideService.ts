import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChannelCategoryRolePermission } from "../models/ChannelCategoryRolePermission";
import type { ChannelCategoryUserPermission } from "../models/ChannelCategoryUserPermission";
import type { ChannelRolePermission } from "../models/ChannelRolePermission";
import type { ChannelUserPermission } from "../models/ChannelUserPermission";
export class PermissionOverrideService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * Create a channel role permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelRolePermissionCreate({
		serverId,
		channelId,
		roleId,
		requestBody,
	}: {
		serverId: string;
		channelId: string;
		roleId: number;
		requestBody: {
			/**
			 * A JSON object of [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) with `true`, `false` or null values. Permission list can only contain relevant permissions for the channel type
			 */
			permissions: Record<string, any>;
		};
	}): CancelablePromise<{
		channelRolePermission: ChannelRolePermission;
	}> {
		return this.httpRequest.request({
			method: "POST",
			url: "/servers/{serverId}/channels/{channelId}/permissions/roles/{roleId}",
			path: {
				serverId: serverId,
				channelId: channelId,
				roleId: roleId,
			},
			body: requestBody,
			mediaType: "application/json",
		});
	}
	/**
	 * Read a channel role permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelRolePermissionRead({
		serverId,
		channelId,
		roleId,
	}: {
		serverId: string;
		channelId: string;
		roleId: number;
	}): CancelablePromise<{
		channelRolePermission: ChannelRolePermission;
	}> {
		return this.httpRequest.request({
			method: "GET",
			url: "/servers/{serverId}/channels/{channelId}/permissions/roles/{roleId}",
			path: {
				serverId: serverId,
				channelId: channelId,
				roleId: roleId,
			},
		});
	}
	/**
	 * Update a channel role permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelRolePermissionUpdate({
		serverId,
		channelId,
		roleId,
		requestBody,
	}: {
		serverId: string;
		channelId: string;
		roleId: number;
		requestBody: {
			/**
			 * A JSON object of [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) with `true`, `false` or null values. Permission list can only contain relevant permissions for the channel type
			 */
			permissions: Record<string, any>;
		};
	}): CancelablePromise<{
		channelRolePermission: ChannelRolePermission;
	}> {
		return this.httpRequest.request({
			method: "PATCH",
			url: "/servers/{serverId}/channels/{channelId}/permissions/roles/{roleId}",
			path: {
				serverId: serverId,
				channelId: channelId,
				roleId: roleId,
			},
			body: requestBody,
			mediaType: "application/json",
		});
	}
	/**
	 * Delete a channel role permission
	 * @returns void
	 * @throws ApiError
	 */
	public channelRolePermissionDelete({
		serverId,
		channelId,
		roleId,
	}: {
		serverId: string;
		channelId: string;
		roleId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/servers/{serverId}/channels/{channelId}/permissions/roles/{roleId}",
			path: {
				serverId: serverId,
				channelId: channelId,
				roleId: roleId,
			},
		});
	}
	/**
	 * ReadMany a channel role permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelRolePermissionReadMany({
		serverId,
		channelId,
	}: {
		serverId: string;
		channelId: string;
	}): CancelablePromise<{
		channelRolePermissions: Array<ChannelRolePermission>;
	}> {
		return this.httpRequest.request({
			method: "GET",
			url: "/servers/{serverId}/channels/{channelId}/permissions/roles",
			path: {
				serverId: serverId,
				channelId: channelId,
			},
		});
	}
	/**
	 * Create a channel user permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelUserPermissionCreate({
		serverId,
		channelId,
		userId,
		requestBody,
	}: {
		serverId: string;
		channelId: string;
		userId: string | "@me";
		requestBody: {
			/**
			 * A JSON object of [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) with `true`, `false` or null values. Permission list can only contain relevant permissions for the channel type
			 */
			permissions: Record<string, any>;
		};
	}): CancelablePromise<{
		channelUserPermission: ChannelUserPermission;
	}> {
		return this.httpRequest.request({
			method: "POST",
			url: "/servers/{serverId}/channels/{channelId}/permissions/users/{userId}",
			path: {
				serverId: serverId,
				channelId: channelId,
				userId: userId,
			},
			body: requestBody,
			mediaType: "application/json",
		});
	}
	/**
	 * Read a channel user permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelUserPermissionRead({
		serverId,
		channelId,
		userId,
	}: {
		serverId: string;
		channelId: string;
		userId: string | "@me";
	}): CancelablePromise<{
		channelUserPermission: ChannelUserPermission;
	}> {
		return this.httpRequest.request({
			method: "GET",
			url: "/servers/{serverId}/channels/{channelId}/permissions/users/{userId}",
			path: {
				serverId: serverId,
				channelId: channelId,
				userId: userId,
			},
		});
	}
	/**
	 * Update a channel user permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelUserPermissionUpdate({
		serverId,
		channelId,
		userId,
		requestBody,
	}: {
		serverId: string;
		channelId: string;
		userId: string | "@me";
		requestBody: {
			/**
			 * A JSON object of [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) with `true`, `false` or null values. Permission list can only contain relevant permissions for the channel type
			 */
			permissions: Record<string, any>;
		};
	}): CancelablePromise<{
		channelUserPermission: ChannelUserPermission;
	}> {
		return this.httpRequest.request({
			method: "PATCH",
			url: "/servers/{serverId}/channels/{channelId}/permissions/users/{userId}",
			path: {
				serverId: serverId,
				channelId: channelId,
				userId: userId,
			},
			body: requestBody,
			mediaType: "application/json",
		});
	}
	/**
	 * Delete a channel user permission
	 * @returns void
	 * @throws ApiError
	 */
	public channelUserPermissionDelete({
		serverId,
		channelId,
		userId,
	}: {
		serverId: string;
		channelId: string;
		userId: string | "@me";
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/servers/{serverId}/channels/{channelId}/permissions/users/{userId}",
			path: {
				serverId: serverId,
				channelId: channelId,
				userId: userId,
			},
		});
	}
	/**
	 * Read a channel user permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelUserPermissionReadMany({
		serverId,
		channelId,
	}: {
		serverId: string;
		channelId: string;
	}): CancelablePromise<{
		channelUserPermissions: Array<ChannelUserPermission>;
	}> {
		return this.httpRequest.request({
			method: "GET",
			url: "/servers/{serverId}/channels/{channelId}/permissions/users",
			path: {
				serverId: serverId,
				channelId: channelId,
			},
		});
	}
	/**
	 * Create a channel category user permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelCategoryUserPermissionCreate({
		serverId,
		categoryId,
		userId,
		requestBody,
	}: {
		serverId: string;
		categoryId: number;
		userId: string | "@me";
		requestBody: {
			/**
			 * A JSON object of [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) with `true`, `false` or null values. Permission list can only contain relevant permissions for the channel type
			 */
			permissions: Record<string, any>;
		};
	}): CancelablePromise<{
		channelCategoryUserPermission: ChannelCategoryUserPermission;
	}> {
		return this.httpRequest.request({
			method: "POST",
			url: "/servers/{serverId}/categories/{categoryId}/permissions/users/{userId}",
			path: {
				serverId: serverId,
				categoryId: categoryId,
				userId: userId,
			},
			body: requestBody,
			mediaType: "application/json",
		});
	}
	/**
	 * Read a channel category user permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelCategoryUserPermissionRead({
		serverId,
		categoryId,
		userId,
	}: {
		serverId: string;
		categoryId: number;
		userId: string | "@me";
	}): CancelablePromise<{
		channelCategoryUserPermission: ChannelCategoryUserPermission;
	}> {
		return this.httpRequest.request({
			method: "GET",
			url: "/servers/{serverId}/categories/{categoryId}/permissions/users/{userId}",
			path: {
				serverId: serverId,
				categoryId: categoryId,
				userId: userId,
			},
		});
	}
	/**
	 * Update a channel category user permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelCategoryUserPermissionUpdate({
		serverId,
		categoryId,
		userId,
		requestBody,
	}: {
		serverId: string;
		categoryId: number;
		userId: string | "@me";
		requestBody: {
			/**
			 * A JSON object of [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) with `true`, `false` or null values. Permission list can only contain relevant permissions for the channel type
			 */
			permissions: Record<string, any>;
		};
	}): CancelablePromise<{
		channelCategoryUserPermission: ChannelCategoryUserPermission;
	}> {
		return this.httpRequest.request({
			method: "PATCH",
			url: "/servers/{serverId}/categories/{categoryId}/permissions/users/{userId}",
			path: {
				serverId: serverId,
				categoryId: categoryId,
				userId: userId,
			},
			body: requestBody,
			mediaType: "application/json",
		});
	}
	/**
	 * Delete a channel category user permission
	 * @returns void
	 * @throws ApiError
	 */
	public channelCategoryUserPermissionDelete({
		serverId,
		categoryId,
		userId,
	}: {
		serverId: string;
		categoryId: number;
		userId: string | "@me";
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/servers/{serverId}/categories/{categoryId}/permissions/users/{userId}",
			path: {
				serverId: serverId,
				categoryId: categoryId,
				userId: userId,
			},
		});
	}
	/**
	 * Get a list of the channel category user permissions
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelCategoryUserPermissionReadMany({
		serverId,
		categoryId,
	}: {
		serverId: string;
		categoryId: number;
	}): CancelablePromise<{
		channelCategoryUserPermissions: Array<ChannelCategoryUserPermission>;
	}> {
		return this.httpRequest.request({
			method: "GET",
			url: "/servers/{serverId}/categories/{categoryId}/permissions/users",
			path: {
				serverId: serverId,
				categoryId: categoryId,
			},
		});
	}
	/**
	 * Create a channel category role permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelCategoryRolePermissionCreate({
		serverId,
		categoryId,
		roleId,
		requestBody,
	}: {
		serverId: string;
		categoryId: number;
		roleId: number;
		requestBody: {
			/**
			 * A JSON object of [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) with `true`, `false` or null values. Permission list can only contain relevant permissions for the channel type
			 */
			permissions: Record<string, any>;
		};
	}): CancelablePromise<{
		channelCategoryRolePermission: ChannelCategoryRolePermission;
	}> {
		return this.httpRequest.request({
			method: "POST",
			url: "/servers/{serverId}/categories/{categoryId}/permissions/roles/{roleId}",
			path: {
				serverId: serverId,
				categoryId: categoryId,
				roleId: roleId,
			},
			body: requestBody,
			mediaType: "application/json",
		});
	}
	/**
	 * Read a channel category role permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelCategoryRolePermissionRead({
		serverId,
		categoryId,
		roleId,
	}: {
		serverId: string;
		categoryId: number;
		roleId: number;
	}): CancelablePromise<{
		channelCategoryRolePermission: ChannelCategoryRolePermission;
	}> {
		return this.httpRequest.request({
			method: "GET",
			url: "/servers/{serverId}/categories/{categoryId}/permissions/roles/{roleId}",
			path: {
				serverId: serverId,
				categoryId: categoryId,
				roleId: roleId,
			},
		});
	}
	/**
	 * Update a channel category role permission
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelCategoryRolePermissionUpdate({
		serverId,
		categoryId,
		roleId,
		requestBody,
	}: {
		serverId: string;
		categoryId: number;
		roleId: number;
		requestBody: {
			/**
			 * A JSON object of [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) with `true`, `false` or null values. Permission list can only contain relevant permissions for the channel type
			 */
			permissions: Record<string, any>;
		};
	}): CancelablePromise<{
		channelCategoryRolePermission: ChannelCategoryRolePermission;
	}> {
		return this.httpRequest.request({
			method: "PATCH",
			url: "/servers/{serverId}/categories/{categoryId}/permissions/roles/{roleId}",
			path: {
				serverId: serverId,
				categoryId: categoryId,
				roleId: roleId,
			},
			body: requestBody,
			mediaType: "application/json",
		});
	}
	/**
	 * Delete a channel category role permission
	 * @returns void
	 * @throws ApiError
	 */
	public channelCategoryRolePermissionDelete({
		serverId,
		categoryId,
		roleId,
	}: {
		serverId: string;
		categoryId: number;
		roleId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/servers/{serverId}/categories/{categoryId}/permissions/roles/{roleId}",
			path: {
				serverId: serverId,
				categoryId: categoryId,
				roleId: roleId,
			},
		});
	}
	/**
	 * Get a list of the channel category role permissions
	 * @returns any Success
	 * @throws ApiError
	 */
	public channelCategoryRolePermissionReadMany({
		serverId,
		categoryId,
	}: {
		serverId: string;
		categoryId: number;
	}): CancelablePromise<{
		channelCategoryRolePermissions: Array<ChannelCategoryRolePermission>;
	}> {
		return this.httpRequest.request({
			method: "GET",
			url: "/servers/{serverId}/categories/{categoryId}/permissions/roles",
			path: {
				serverId: serverId,
				categoryId: categoryId,
			},
		});
	}
}
