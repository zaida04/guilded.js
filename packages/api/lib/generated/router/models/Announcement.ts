/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Mentions } from "./Mentions";

export type Announcement = {
	/**
	 * The ID of the announcement
	 */
	id: string;
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * The ISO 8601 timestamp that the announcement was created at
	 */
	createdAt: string;
	/**
	 * The ID of the user who created this announcement
	 */
	createdBy: string;
	/**
	 * The content of the announcement
	 */
	content: string;
	mentions?: Mentions;
	/**
	 * The title of the announcement
	 */
	title: string;
};
