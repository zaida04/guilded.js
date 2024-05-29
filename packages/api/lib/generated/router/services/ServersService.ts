import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Server } from "../models/Server";
export class ServersService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * Get a server
	 * Fetch various information about a given server. Currently, the bot must be a member of the server in order to fetch its information.
	 * @returns any Success
	 * @throws ApiError
	 */
	public serverRead({
		serverId,
	}: {
		serverId: string;
	}): CancelablePromise<{
		server: Server;
		/**
		 * Count of members in this server after this join. **Note:** at higher member counts (1000+), this value is only updated periodically and should not be used in situations that require absolute accuracy
		 */
		serverMemberCount: number;
	}> {
		return this.httpRequest.request({
			method: "GET",
			url: "/servers/{serverId}",
			path: {
				serverId: serverId,
			},
		});
	}
}
