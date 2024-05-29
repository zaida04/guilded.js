/* generated using openapi-typescript-codegen -- do not edit */
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
	/**
	 * The priority of the category will determine its position relative to other categories in the group. The higher the value, the higher up it will be displayed in the UI. Returned values can be null, in which case sorting will be done by `createdAt` in descending order. Due to legacy issues, sending a null value is not possible
	 */
	priority?: number;
};
