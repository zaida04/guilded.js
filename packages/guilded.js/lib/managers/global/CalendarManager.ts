import { Collection } from "@discordjs/collection";
import { CacheableStructManager } from "./CacheableStructManager";
import {
	CalendarEvent,
	CalendarEventRsvp,
} from "../../structures/CalendarEvent";
import { RestBody, RestPath } from "@guildedjs/guilded-api-typings";

/**
 * The manager is used to interact with calendars on a server.
 */
export class GlobalCalendarManager extends CacheableStructManager<
	number,
	CalendarEvent
> {
	get shouldCacheCalendar() {
		return this.client.options?.cache?.cacheCalendars !== false;
	}

	get shouldCacheCalendarRsvps() {
		return this.client.options?.cache?.cacheCalendarsRsvps !== false;
	}

	/**
	 * Creates a calendar event.
	 * @param channelId The ID of the channel in which to create the event.
	 * @param options The options for the event.
	 * @returns A promise that resolves with the created calendar event.
	 */
	create(
		channelId: string,
		options: RestBody<RestPath<"/channels/{channelId}/events">["post"]>
	): Promise<CalendarEvent> {
		return this.client.rest.router
			.createCalendarEvent(channelId, options)
			.then((data) => {
				return new CalendarEvent(this.client, data.calendarEvent);
			});
	}

	/**
	 * Fetches a single calendar event.
	 * @param channelId The ID of the channel in which to fetch the event.
	 * @param calendarEventId The ID of the event to fetch.
	 * @param force Whether or not to force a fetch instead of using a cached version.
	 * @returns A promise that resolves with the fetched calendar event.
	 */
	fetch(
		channelId: string,
		calendarEventId: number,
		force?: boolean
	): Promise<CalendarEvent> {
		if (!force) {
			const existingCalendar = this.client.calendars.cache.get(calendarEventId);
			if (existingCalendar) return Promise.resolve(existingCalendar);
		}
		return this.client.rest.router
			.getCalendarEvent(channelId, calendarEventId)
			.then((data) => {
				const newCalendar = new CalendarEvent(this.client, data.calendarEvent);
				if (this.shouldCacheCalendar)
					this.client.calendars.cache.set(newCalendar.id, newCalendar);
				return newCalendar;
			});
	}

	/**
	 * Fetches multiple calendar events.
	 * @param channelId The ID of the channel in which to fetch the events.
	 * @param options The options for the fetch.
	 * @returns A promise that resolves with a collection of the fetched calendar events.
	 */
	fetchMany(
		channelId: string,
		options: RESTGetCalendarEventsBody
	): Promise<Collection<number, CalendarEvent>> {
		return this.client.rest.router
			.getCalendarEvents(channelId, options)
			.then((data) => {
				const calendarEvents = new Collection<number, CalendarEvent>();
				for (const calendarEvent of data.calendarEvents) {
					const newCalendar = new CalendarEvent(this.client, calendarEvent);
					calendarEvents.set(newCalendar.id, newCalendar);
					if (this.shouldCacheCalendar)
						this.client.calendars.cache.set(newCalendar.id, newCalendar);
				}
				return calendarEvents;
			});
	}

	/**
	 * Updates a calendar event.
	 * @param channelId The ID of the channel in which the event exists.
	 * @param calendarEventId The ID of the event to update.
	 * @param options The options for the update.
	 * @returns A promise that resolves with the updated calendar event.
	 */
	update(
		channelId: string,
		calendarEventId: number,
		options: RESTPatchCalendarEventBody
	): Promise<CalendarEvent> {
		return this.client.rest.router
			.updateCalendarEvent(channelId, calendarEventId, options)
			.then((data) => {
				const existingCalendar = this.cache.get(calendarEventId);
				if (existingCalendar)
					return existingCalendar._update(data.calendarEvent);

				const newCalendar = new CalendarEvent(this.client, data.calendarEvent);
				if (this.shouldCacheCalendar)
					this.cache.set(newCalendar.id, newCalendar);
				return newCalendar;
			});
	}

	/**
	 * Delete a calendar event.
	 * @param channelId - The ID of the channel where the calendar event is located.
	 * @param calendarEventId - The ID of the calendar event to delete.
	 * @returns A Promise that resolves with the deleted calendar event or `undefined` if the event was not cached.
	 */
	delete(
		channelId: string,
		calendarEventId: number
	): Promise<CalendarEvent | void> {
		return this.client.rest.router
			.deleteCalendarEvent(channelId, calendarEventId)
			.then((data) => {
				const cachedCalendar = this.cache.get(calendarEventId);
				return cachedCalendar ?? void 0;
			});
	}

	/**
	 * Get a single RSVP from a calendar event.
	 * @param channelId - The ID of the channel where the calendar event is located.
	 * @param calendarEventId - The ID of the calendar event to get the RSVP from.
	 * @param userId - The ID of the user who made the RSVP.
	 * @param force - Whether to force a request to the API instead of returning the cached RSVP.
	 * @returns A Promise that resolves with the requested RSVP.
	 */
	fetchRsvp(
		channelId: string,
		calendarEventId: number,
		userId: string,
		force?: boolean
	): Promise<CalendarEventRsvp> {
		if (!force) {
			const existingRsvp = this.client.calendars.cache
				.get(calendarEventId)
				?.rsvps?.get(userId);
			if (existingRsvp) return Promise.resolve(existingRsvp);
		}
		return this.client.rest.router
			.getCalendarEventRsvp(channelId, calendarEventId, userId)
			.then((data) => {
				const newRsvp = new CalendarEventRsvp(
					this.client,
					data.calendarEventRsvp
				);
				if (this.shouldCacheCalendar && this.shouldCacheCalendarRsvps)
					this.cache
						.get(newRsvp.calendarEventId)
						?.rsvps?.set(newRsvp.userId, newRsvp);
				return newRsvp;
			});
	}

	/**
	 * Fetch RSVPs for a calendar event.
	 * @param channelId - The ID of the channel where the calendar event is located.
	 * @param calendarEventId - The ID of the calendar event to fetch RSVPs for.
	 * @returns A Promise that resolves with a collection of RSVPs.
	 */
	fetchManyRsvps(
		channelId: string,
		calendarEventId: number
	): Promise<Collection<string, CalendarEventRsvp>> {
		return this.client.rest.router
			.getCalendarEventRsvps(channelId, calendarEventId)
			.then((data) => {
				const rsvpEvents = new Collection<string, CalendarEventRsvp>();
				for (const rsvpEvent of data.calendarEventRsvps) {
					if (this.shouldCacheCalendar && this.shouldCacheCalendarRsvps) {
						const cachedCalendar = this.cache.get(calendarEventId);
						cachedCalendar?.rsvps?.set(
							rsvpEvent.userId,
							new CalendarEventRsvp(this.client, rsvpEvent)
						);
					}
					rsvpEvents.set(
						rsvpEvent.userId,
						new CalendarEventRsvp(this.client, rsvpEvent)
					);
				}
				return rsvpEvents;
			});
	}

	/**
	 * Creates or updates an RSVP for a calendar event.
	 * @param channelId The ID of the channel.
	 * @param calendarEventId The ID of the calendar event.
	 * @param userId The ID of the user.
	 * @param options The options for updating the RSVP.
	 * @returns A promise that resolves with the updated or created RSVP.
	 */
	updateRsvp(
		channelId: string,
		calendarEventId: number,
		userId: string,
		options: RESTPatchCalendarEventRsvpBody
	): Promise<CalendarEventRsvp> {
		return this.client.rest.router
			.updateCalendarEventRvsp(channelId, calendarEventId, userId, options)
			.then((data) => {
				const existingRsvp = this.cache
					.get(calendarEventId)
					?.rsvps?.get(userId);
				if (existingRsvp) return existingRsvp?._update(data.calendarEventRsvp);

				const newRsvp = new CalendarEventRsvp(
					this.client,
					data.calendarEventRsvp
				);
				if (this.shouldCacheCalendar && this.shouldCacheCalendarRsvps)
					this.cache.get(calendarEventId)?.rsvps?.set(userId, newRsvp);
				return newRsvp;
			});
	}

	/**
	 * Creates or updates multiple RSVPs for a calendar event.
	 * @param channelId The ID of the channel.
	 * @param calendarEventId The ID of the calendar event.
	 * @param options The options for updating many RSVP.
	 */
	updateManyRsvp(
		channelId: string,
		calendarEventId: number,
		options: RESTPatchCalendarEventRsvpManyBody
	): Promise<void> {
		return this.client.rest.router
			.updateCalendarEventRsvpMany(channelId, calendarEventId, options)
			.then((data) => void 0);
	}

	/**
	 * Deletes an RSVP for a calendar event.
	 * @param channelId The ID of the channel.
	 * @param calendarEventId The ID of the calendar event.
	 * @param userId The ID of the user.
	 * @returns A promise that resolves with the deleted RSVP or void if it was not cached.
	 */
	deleteRsvp(
		channelId: string,
		calendarEventId: number,
		userId: string
	): Promise<CalendarEventRsvp | void> {
		return this.client.rest.router
			.deleteCalendarEventRvsp(channelId, calendarEventId, userId)
			.then((data) => {
				if (this.shouldCacheCalendar && this.shouldCacheCalendarRsvps) {
					const cachedCalendar = this.cache.get(calendarEventId);
					const rsvp = cachedCalendar?.rsvps?.get(userId);
					return rsvp ?? void 0;
				}
				return void 0;
			});
	}
}
