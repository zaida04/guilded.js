import type { BaseHttpRequest } from "../core/BaseHttpRequest";
/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";

export class UserStatusService {
	constructor(
		public readonly httpRequest: BaseHttpRequest,
	) {}

	/**
	 * Update your status
	 * This value can be a max of 24 hours into the futre. If you are wanting a longer expiration, set this value to null so that it never expires. **Note** - at this time, you can only set a status on your own user
	 * @returns void
	 * @throws ApiError
	 */
	public userStatusCreate({
		userId,
		requestBody,
	}: {
		userId:
			| string
			| "@me";
		requestBody: {
			/**
			 * The content of the user status. The supported markdown for this content only includes reactions and plaintext for now
			 */
			content?: string;
			/**
			 * Emote ID to apply
			 */
			emoteId: number;
			/**
			 * An ISO 8601 timestamp that will be used to indicate when an expiration occurs. Expiration usually will not occur exactly at this time. Bot logic should not expect a guarantee of timing as a result, but can expect that it'll happen very shortly afterwards
			 */
			expiresAt?: string;
		};
	}): CancelablePromise<void> {
		return this.httpRequest.request(
			{
				method: "PUT",
				url: "/users/{userId}/status",
				path: {
					userId: userId,
				},
				body: requestBody,
				mediaType: "application/json",
			},
		);
	}

	/**
	 * Delete your status
	 * **Note** - at this time, you can only set a status on your own user
	 * @returns void
	 * @throws ApiError
	 */
	public userStatusDelete({
		userId,
	}: {
		userId:
			| string
			| "@me";
	}): CancelablePromise<void> {
		return this.httpRequest.request(
			{
				method: "DELETE",
				url: "/users/{userId}/status",
				path: {
					userId: userId,
				},
			},
		);
	}
}
