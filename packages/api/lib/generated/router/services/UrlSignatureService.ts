import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UrlSignature } from "../models/UrlSignature";
export class UrlSignatureService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * Create URL signatures
	 * User-uploaded content hosted on our CDN will no longer be accessible directly after June 30th, 2024. To access the content, you will need to generate a valid signature via the `/url-signatures` endpoint, which is valid for 5 minutes, and download the content to store the data. Each asset comes with a daily request limit of one, so make sure to save the assets accordingly.
	 * @returns any Success
	 * @throws ApiError
	 */
	public urlSignatureCreateMany({
		requestBody,
	}: {
		requestBody: {
			/**
			 * An array of guilded CDN based URLs to get a signature on. Each URL is valid for 5 minutes and limited to one request per day
			 */
			urls: Array<string>;
		};
	}): CancelablePromise<{
		/**
		 * An array of URLs with a valid signature that has a 5 minute expiration. Any item with a `retryAfter` indicates you are still within the rate limit for that particular `url`
		 */
		urlSignatures: Array<UrlSignature>;
	}> {
		return this.httpRequest.request({
			method: "POST",
			url: "/url-signatures",
			body: requestBody,
			mediaType: "application/json",
		});
	}
}
