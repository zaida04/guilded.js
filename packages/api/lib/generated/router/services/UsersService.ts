/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Server } from '../models/Server';
import type { User } from '../models/User';
import { HttpRequest } from "../core/HttpRequest";


export class UsersService {

	constructor(public readonly httpRequest: HttpRequest) { }

	/**
	 * Get a user
	 * **Note** - at this time, you can only retrieve your own user
	 * @returns any Success
	 * @throws ApiError
	 */
	public userRead({
		userId,
	}: {
		userId: (string | '@me'),
	}): Promise<{
		user: User;
	}> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/users/{userId}',
			path: {
				'userId': userId,
			},
		});
	}

	/**
	 * Get a users servers
	 * **Note** - at this time, you can only retrieve your own servers
	 * @returns any Success
	 * @throws ApiError
	 */
	public userServerReadMany({
		userId,
	}: {
		userId: (string | '@me'),
	}): Promise<{
		servers: Array<Server>;
	}> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/users/{userId}/servers',
			path: {
				'userId': userId,
			},
		});
	}

}
