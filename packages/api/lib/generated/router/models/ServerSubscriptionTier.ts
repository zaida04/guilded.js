/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ServerSubscriptionTier = {
	/**
	 * The type of the server subscription tier. This field is case sensitive!!
	 */
	type:
		| "Gold"
		| "Silver"
		| "Copper";
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The description associated with the server subscription tier
	 */
	description?: string;
	/**
	 * The ID of the role
	 */
	roleId?: number;
	/**
	 * The cost of the tier in cents USD per month
	 */
	cost: number;
	/**
	 * The ISO 8601 timestamp that the server subscription tier was created at
	 */
	createdAt: string;
};
