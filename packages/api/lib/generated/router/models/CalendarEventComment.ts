/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Mentions } from "./Mentions";

export type CalendarEventComment = {
	/**
	 * The ID of the calendar event comment
	 */
	id: number;
	/**
	 * The content of the calendar event comment
	 */
	content: string;
	/**
	 * The ISO 8601 timestamp that the calendar event comment was created at
	 */
	createdAt: string;
	/**
	 * The ISO 8601 timestamp that the calendar event comment was updated at, if relevant
	 */
	updatedAt?: string;
	/**
	 * The ID of the calendar event
	 */
	calendarEventId: number;
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * The ID of the user who created this calendar event comment (Note: If this event has `createdByWebhookId` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)
	 */
	createdBy: string;
	mentions?: Mentions;
};
