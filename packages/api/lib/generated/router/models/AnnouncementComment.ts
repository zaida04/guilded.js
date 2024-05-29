/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Mentions } from "./Mentions";
export type AnnouncementComment = {
	/**
	 * The ID of the announcement comment
	 */
	id: number;
	/**
	 * The content of the announcement comment
	 */
	content: string;
	/**
	 * The ISO 8601 timestamp that the announcement comment was created at
	 */
	createdAt: string;
	/**
	 * The ISO 8601 timestamp that the announcement comment was updated at, if relevant
	 */
	updatedAt?: string;
	/**
	 * The ID of the user who created this announcement comment (Note: If this event has `createdByWebhookId` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)
	 */
	createdBy: string;
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * The ID of the announcement
	 */
	announcementId: string;
	mentions?: Mentions;
};
