/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CalendarEvent } from '../models/CalendarEvent';
import type { CalendarEventRsvp } from '../models/CalendarEventRsvp';

import { HttpRequest } from "../core/HttpRequest";

export class CalendarEventsService {

	constructor(public readonly httpRequest: HttpRequest) { }

	/**
	 * Create a calendar event
	 * We currently do not have a way to surface the `repeatInfo` after event series are updated. Stay tuned!
	 * @returns any Success
	 * @throws ApiError
	 */
	public calendarEventCreate({
		channelId,
		requestBody,
	}: {
		/**
		 * The calendar to create the event in
		 */
		channelId: string,
		requestBody: {
			/**
			 * The name of the event
			 */
			name: string;
			/**
			 * The description of the event
			 */
			description?: string;
			/**
			 * The location of the event
			 */
			location?: string;
			/**
			 * The ISO 8601 timestamp that the event starts at
			 */
			startsAt?: string;
			/**
			 * A URL to associate with the event
			 */
			url?: string;
			/**
			 * The color of the event when viewing in the calendar
			 */
			color?: number;
			/**
			 * Does the event last all day? If passed with `duration`, `duration` will only be applied if it is an interval of minutes represented in days (e.g., `duration: 2880`)
			 */
			isAllDay?: boolean;
			/**
			 * When disabled, users will not be able to RSVP to the event
			 */
			rsvpDisabled?: boolean;
			/**
			 * The number of RSVPs to allow before waitlisting RSVPs
			 */
			rsvpLimit?: number;
			/**
			 * When `rsvpLimit` is set, users from the waitlist will be added as space becomes available in the event
			 */
			autofillWaitlist?: boolean;
			/**
			 * The duration of the event _**in minutes**_
			 */
			duration?: number;
			isPrivate?: boolean;
			/**
			 * The role IDs to restrict the event to
			 */
			roleIds?: Array<number>;
			repeatInfo?: {
				/**
				 * How often you want your event to repeat (important note: this will repeat for the next 180 days unless custom is defined)
				 */
				type: 'once' | 'everyDay' | 'everyWeek' | 'everyMonth' | 'custom';
				/**
				 * Apply further clarification to your events. This **must** have `type` set to `custom`
				 */
				every?: {
					/**
					 * How often between your interval the event should repeat. For example, 1 would be every interval, 2 would be every second occurrence of the interval
					 */
					count: number;
					/**
					 * Coupled with `count`, this indicates the time range you are repeating your event over
					 */
					interval: 'day' | 'month' | 'year' | 'week';
				};
				/**
				 * Used to control the end date of the event repeat (only used when `type` is `custom`; if used with `endDate`, the earliest resultant date of the two will be used)
				 */
				endsAfterOccurrences?: number;
				/**
				 * The ISO 8601 timestamp that the event ends at. Used to control the end date of the event repeat (only used when `type` is `custom`; if used with `endsAfterOccurrences`, the earliest resultant date of the two will be used)
				 */
				endDate?: string;
				/**
				 * Used to control the day of the week that the event should repeat on (only used when `type` is `custom` and when `every.interval` is `week`)
				 */
				on?: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;
			};
		},
	}): Promise<{
		calendarEvent: CalendarEvent;
	}> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/channels/{channelId}/events',
			path: {
				'channelId': channelId,
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

	/**
	 * Get calendar events
	 * Results returned will be ordered ascending by the event's `startsAt`. `before` and `after` will filter based on the event's `startsAt`
	 * @returns any Success
	 * @throws ApiError
	 */
	public calendarEventReadMany({
		channelId,
		before,
		after,
		limit = 25,
	}: {
		channelId: string,
		before?: string,
		after?: string,
		limit?: number,
	}): Promise<{
		calendarEvents: Array<CalendarEvent>;
	}> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/channels/{channelId}/events',
			path: {
				'channelId': channelId,
			},
			query: {
				'before': before,
				'after': after,
				'limit': limit,
			},
		});
	}

	/**
	 * Get a calendar event
	 * @returns any Success
	 * @throws ApiError
	 */
	public calendarEventRead({
		channelId,
		calendarEventId,
	}: {
		channelId: string,
		calendarEventId: number,
	}): Promise<{
		calendarEvent: CalendarEvent;
	}> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/channels/{channelId}/events/{calendarEventId}',
			path: {
				'channelId': channelId,
				'calendarEventId': calendarEventId,
			},
		});
	}

	/**
	 * Update a calendar event
	 * We currently do not have a way to surface the `repeatInfo` after event series are updated. Stay tuned!
	 * @returns any Success
	 * @throws ApiError
	 */
	public calendarEventUpdate({
		channelId,
		calendarEventId,
		requestBody,
	}: {
		channelId: string,
		calendarEventId: number,
		requestBody: {
			/**
			 * The name of the event
			 */
			name?: string;
			/**
			 * The description of the event
			 */
			description?: string;
			/**
			 * The location of the event
			 */
			location?: string;
			/**
			 * The ISO 8601 timestamp that the event starts at
			 */
			startsAt?: string;
			/**
			 * A URL to associate with the event
			 */
			url?: string;
			/**
			 * The color of the event when viewing in the calendar
			 */
			color?: number;
			/**
			 * Does the event last all day? If passed with `duration`, `duration` will only be applied if it is an interval of minutes represented in days (e.g., `duration: 2880`)
			 */
			isAllDay?: boolean;
			/**
			 * When disabled, users will not be able to RSVP to the event
			 */
			rsvpDisabled?: boolean;
			/**
			 * The number of RSVPs to allow before waitlisting RSVPs
			 */
			rsvpLimit?: number;
			/**
			 * When `rsvpLimit` is set, users from the waitlist will be added as space becomes available in the event
			 */
			autofillWaitlist?: boolean;
			/**
			 * The duration of the event _**in minutes**_
			 */
			duration?: number;
			isPrivate?: boolean;
			/**
			 * The role IDs to restrict the event to. Passing an empty array will clear the role IDs on the event
			 */
			roleIds?: Array<number>;
			cancellation?: {
				/**
				 * The description of event cancellation
				 */
				description?: string;
			};
		},
	}): Promise<{
		calendarEvent: CalendarEvent;
	}> {
		return this.httpRequest.request({
			method: 'PATCH',
			url: '/channels/{channelId}/events/{calendarEventId}',
			path: {
				'channelId': channelId,
				'calendarEventId': calendarEventId,
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

	/**
	 * Delete a calendar event
	 * @returns void 
	 * @throws ApiError
	 */
	public calendarEventDelete({
		channelId,
		calendarEventId,
	}: {
		channelId: string,
		calendarEventId: number,
	}): Promise<void> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/channels/{channelId}/events/{calendarEventId}',
			path: {
				'channelId': channelId,
				'calendarEventId': calendarEventId,
			},
		});
	}

	/**
	 * Get a calendar event RSVP
	 * @returns any Success
	 * @throws ApiError
	 */
	public calendarEventRsvpRead({
		channelId,
		calendarEventId,
		userId,
	}: {
		channelId: string,
		calendarEventId: number,
		userId: (string | '@me'),
	}): Promise<{
		calendarEventRsvp: CalendarEventRsvp;
	}> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/channels/{channelId}/events/{calendarEventId}/rsvps/{userId}',
			path: {
				'channelId': channelId,
				'calendarEventId': calendarEventId,
				'userId': userId,
			},
		});
	}

	/**
	 * Create or update a calendar event RSVP
	 * @returns any Success
	 * @throws ApiError
	 */
	public calendarEventRsvpUpdate({
		channelId,
		calendarEventId,
		userId,
		requestBody,
	}: {
		channelId: string,
		calendarEventId: number,
		userId: (string | '@me'),
		requestBody: {
			/**
			 * The status of the RSVP
			 */
			status: 'going' | 'maybe' | 'declined' | 'invited';
		},
	}): Promise<{
		calendarEventRsvp: CalendarEventRsvp;
	}> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/channels/{channelId}/events/{calendarEventId}/rsvps/{userId}',
			path: {
				'channelId': channelId,
				'calendarEventId': calendarEventId,
				'userId': userId,
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

	/**
	 * Delete a calendar event RSVP
	 * @returns void 
	 * @throws ApiError
	 */
	public calendarEventRsvpDelete({
		channelId,
		calendarEventId,
		userId,
	}: {
		channelId: string,
		calendarEventId: number,
		userId: (string | '@me'),
	}): Promise<void> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/channels/{channelId}/events/{calendarEventId}/rsvps/{userId}',
			path: {
				'channelId': channelId,
				'calendarEventId': calendarEventId,
				'userId': userId,
			},
		});
	}

	/**
	 * Get calendar event RSVPs
	 * @returns any Success
	 * @throws ApiError
	 */
	public calendarEventRsvpReadMany({
		channelId,
		calendarEventId,
	}: {
		channelId: string,
		calendarEventId: number,
	}): Promise<{
		calendarEventRsvps: Array<CalendarEventRsvp>;
	}> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/channels/{channelId}/events/{calendarEventId}/rsvps',
			path: {
				'channelId': channelId,
				'calendarEventId': calendarEventId,
			},
		});
	}

	/**
	 * Create or update a calendar event RSVP for multiple users
	 * @returns void 
	 * @throws ApiError
	 */
	public calendarEventRsvpUpdateMany({
		channelId,
		calendarEventId,
		requestBody,
	}: {
		channelId: string,
		calendarEventId: number,
		requestBody: {
			userIds: Array<string>;
			/**
			 * The status of the RSVP
			 */
			status: 'going' | 'maybe' | 'declined' | 'invited';
		},
	}): Promise<void> {
		return this.httpRequest.request({
			method: 'PUT',
			url: '/channels/{channelId}/events/{calendarEventId}/rsvps',
			path: {
				'channelId': channelId,
				'calendarEventId': calendarEventId,
			},
			body: requestBody,
			mediaType: 'application/json',
		});
	}

}
