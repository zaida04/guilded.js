/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Category = {
	/**
	 * The ID of the category
	 */
	id: number;
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The ID of the group
	 */
	groupId: string;
	/**
	 * The ISO 8601 timestamp that the category was created at
	 */
	createdAt: string;
	/**
	 * The ISO 8601 timestamp that the category was updated at, if relevant
	 */
	updatedAt?: string;
	/**
	 * Name of the category
	 */
	name: string;
};
