import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Role } from "../models/Role";
export class RolesService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * Create a role
	 * By default, a role will be created with the lowest priority on a server. You can update its priority using [the role update route](/docs/api/roles/RoleUpdate)
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
	 * Get roles
	 * @returns any Success
	 * @throws ApiError
	 */
	public roleReadMany({
		serverId,
	}: {
		serverId: string;
	}): CancelablePromise<{
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
	 * Update a role
	 * Note that when a `priority` is updated, there will still only be a socket event for the role that was touched directly and not for other roles that were shifted
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
			 * The priority the role will be in relation to other roles in the server. The higher the value, the more precedence the role has over lower priority roles, and the higher up it will be displayed in the UI. Values can be zero or negative!
			 */
			priority?: number;
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
	/**
	 * Read a server member's permissions
	 * If the user has *all* of the permissions passed, the HTTP status code will be 200; if user is missing one or more permissions passed, the HTTP status code will be [418](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418) with a `meta` property containing `missingPermissions` of the permissions the user does not have (this is a 418 to differentiate from a 403 if the _bot_ did not have permissions to perform the request, not the _user_). Tip: Use the `HEAD` HTTP method for this route if you only care about if the user has permissions and not the response body containing what's missing.
	 * @returns any Success
	 * @throws ApiError
	 */
	public serverMemberPermissionsRead({
		serverId,
		userId,
		ids,
		channelId,
		categoryId,
	}: {
		serverId: string;
		userId: string | "@me";
		/**
		 * A queryString array of `ids[]` representing [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions)
		 */
		ids?: Array<
			| "CanCreateTopics"
			| "CanCreateTopicReplies"
			| "CanDeleteTopics"
			| "CanStickyTopics"
			| "CanLockTopics"
			| "CanManageEmotes"
			| "CanViewFormResponses"
			| "CanUpdateListItems"
			| "CanManageServerXp"
			| "CanCreateThreads"
			| "CanCreateThreadMessages"
			| "CanManageThreads"
			| "CanCreateAnnouncements"
			| "CanUpdateServer"
			| "CanManageRoles"
			| "CanInviteMembers"
			| "CanKickMembers"
			| "CanManageGroups"
			| "CanManageChannels"
			| "CanManageWebhooks"
			| "CanMentionEveryone"
			| "CanModerateChannels"
			| "CanBypassSlowMode"
			| "CanReadApplications"
			| "CanApproveApplications"
			| "CanEditApplicationForm"
			| "CanIndicateLfmInterest"
			| "CanModifyLfmStatus"
			| "CanReadAnnouncements"
			| "CanManageAnnouncements"
			| "CanReadChats"
			| "CanCreateChats"
			| "CanUploadChatMedia"
			| "CanCreatePrivateMessages"
			| "CanManageChats"
			| "CanReadEvents"
			| "CanCreateEvents"
			| "CanEditEvents"
			| "CanDeleteEvents"
			| "CanEditEventRsvps"
			| "CanReadForums"
			| "CanReadDocs"
			| "CanCreateDocs"
			| "CanEditDocs"
			| "CanDeleteDocs"
			| "CanReadMedia"
			| "CanAddMedia"
			| "CanEditMedia"
			| "CanDeleteMedia"
			| "CanListenVoice"
			| "CanAddVoice"
			| "CanManageVoiceGroups"
			| "CanAssignVoiceGroup"
			| "CanBroadcastVoice"
			| "CanDirectVoice"
			| "CanPrioritizeVoice"
			| "CanUseVoiceActivity"
			| "CanMuteMembers"
			| "CanDeafenMembers"
			| "CanSendVoiceMessages"
			| "CanCreateScrims"
			| "CanManageTournaments"
			| "CanRegisterForTournaments"
			| "CanChangeNickname"
			| "CanManageNicknames"
			| "CanViewPollResponses"
			| "CanReadListItems"
			| "CanCreateListItems"
			| "CanDeleteListItems"
			| "CanCompleteListItems"
			| "CanReorderListItems"
			| "CanViewBracket"
			| "CanReportScores"
			| "CanReadSchedules"
			| "CanCreateSchedule"
			| "CanDeleteSchedule"
			| "CanManageBots"
			| "CanReadStreams"
			| "CanJoinStreamVoice"
			| "CanCreateStreams"
			| "CanSendStreamMessages"
			| "CanAddStreamVoice"
			| "CanUseVoiceActivityInStream"
			| "CanReceiveAllSocketEvents"
		>;
		channelId?: string;
		categoryId?: number;
	}): CancelablePromise<{
		/**
		 * A list of [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) the User has in the success case
		 */
		permissions: Array<string>;
	}> {
		return this.httpRequest.request({
			method: "GET",
			url: "/servers/{serverId}/members/{userId}/permissions",
			path: {
				serverId: serverId,
				userId: userId,
			},
			query: {
				ids: ids,
				channelId: channelId,
				categoryId: categoryId,
			},
		});
	}
}
