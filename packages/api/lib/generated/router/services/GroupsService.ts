/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Group } from '../models/Group';

import { HttpRequest } from "../core/HttpRequest";

export class GroupsService {

	constructor(public readonly httpRequest: HttpRequest) { }

	/**
	 * Create a group
	 * Note: only 100 unarchived groups can exist on a server at any time
	 * @returns any Success
	 * @throws ApiError
	 */
	public groupCreate({
		serverId,
		requestBody,
	}: {
		serverId: string,
		requestBody: {
			/**
			 * The name of the group
			 */
			name: string;
			/**
			 * The description associated with the group
			 */
			description?: string;
			/**
			 * The emote to associate with the group
			 */
			emoteId?: number;
			/**
			 * Is this group open for anyone to join?
			 */
			isPublic?: boolean;
		},
	}): Promise<{
		group: Group;
	}> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/servers/{serverId}/groups',
			path: {
				'serverId': serverId,
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

	/**
	 * Get groups
	 * @returns any Success
	 * @throws ApiError
	 */
	public groupReadMany({
		serverId,
	}: {
		serverId: string,
	}): Promise<{
		groups: Array<Group>;
	}> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/servers/{serverId}/groups',
			path: {
				'serverId': serverId,
			},
		});
	}

	/**
	 * Get a group
	 * @returns any Success
	 * @throws ApiError
	 */
	public groupRead({
		serverId,
		groupId,
	}: {
		serverId: string,
		groupId: string,
	}): Promise<{
		group: Group;
	}> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/servers/{serverId}/groups/{groupId}',
			path: {
				'serverId': serverId,
				'groupId': groupId,
			},
		});
	}

	/**
	 * Update a group
	 * @returns any Success
	 * @throws ApiError
	 */
	public groupUpdate({
		serverId,
		groupId,
		requestBody,
	}: {
		serverId: string,
		groupId: string,
		requestBody: {
			/**
			 * The name of the group
			 */
			name?: string;
			/**
			 * The description associated with the group
			 * **Note** - this property cannot be modified on a home group
			 */
			description?: string;
			/**
			 * The emote to associate with the group
			 */
			emoteId?: number;
			/**
			 * Is this group open for anyone to join?
			 * **Note** - this property cannot be modified on a home group
			 */
			isPublic?: boolean;
		},
	}): Promise<{
		group: Group;
	}> {
		return this.httpRequest.request({
			method: 'PATCH',
			url: '/servers/{serverId}/groups/{groupId}',
			path: {
				'serverId': serverId,
				'groupId': groupId,
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

	/**
	 * Delete a group
	 * Note: you cannot delete the home group
	 * @returns void 
	 * @throws ApiError
	 */
	public groupDelete({
		serverId,
		groupId,
	}: {
		serverId: string,
		groupId: string,
	}): Promise<void> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/servers/{serverId}/groups/{groupId}',
			path: {
				'serverId': serverId,
				'groupId': groupId,
			},
		});
	}

}
