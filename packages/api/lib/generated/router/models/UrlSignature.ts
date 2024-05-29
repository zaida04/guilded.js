/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UrlSignature = {
	/**
	 * The URL that is to be signed
	 */
	url: string;
	/**
	 * The url with a valid signature that has a 5 minute expiration on the signature
	 */
	signature?: string;
	/**
	 * The number of seconds to wait before retrying the request
	 */
	retryAfter?: number;
};
