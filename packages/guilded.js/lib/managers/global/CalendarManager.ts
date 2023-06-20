import { Collection } from "@discordjs/collection";
import type { CalendarEventsService } from "@guildedjs/api";
import { CalendarEvent, CalendarEventRsvp } from "../../structures/CalendarEvent";
import type { OptionBody, OptionQuery } from "../../typings";
import { CacheableStructManager } from "./CacheableStructManager";

/**
 * The manager is used to interact with calendars on a server.
 */
export class GlobalCalendarManager extends CacheableStructManager<number, CalendarEvent> {
    get shouldCacheCalendar(): boolean {
        return this.client.options?.cache?.cacheCalendars !== false;
    }

    get shouldCacheCalendarRsvps(): boolean {
        return this.client.options?.cache?.cacheCalendarsRsvps !== false;
    }

    /**
     * Creates a calendar event.
     *
     * @param channelId The ID of the channel in which to create the event.
     * @param options The options for the event.
     * @returns A promise that resolves with the created calendar event.
     */
    async create(channelId: string, options: OptionBody<CalendarEventsService["calendarEventCreate"]>): Promise<CalendarEvent> {
        const data = await this.client.rest.router.calendarEvents.calendarEventCreate({
            channelId,
            requestBody: options,
        });
        return new CalendarEvent(this.client, data.calendarEvent);
    }

    /**
     * Fetches a single calendar event.
     *
     * @param channelId The ID of the channel in which to fetch the event.
     * @param calendarEventId The ID of the event to fetch.
     * @param force Whether or not to force a fetch instead of using a cached version.
     * @returns A promise that resolves with the fetched calendar event.
     */
    async fetch(channelId: string, calendarEventId: number, force?: boolean): Promise<CalendarEvent> {
        if (!force) {
            const existingCalendar = this.client.calendars.cache.get(calendarEventId);
            if (existingCalendar) return existingCalendar;
        }

        const data = await this.client.rest.router.calendarEvents.calendarEventRead({ channelId, calendarEventId });
        const newCalendar = new CalendarEvent(this.client, data.calendarEvent);
        if (this.shouldCacheCalendar) this.client.calendars.cache.set(newCalendar.id, newCalendar);
        return newCalendar;
    }

    /**
     * Fetches multiple calendar events.
     *
     * @param channelId The ID of the channel in which to fetch the events.
     * @param options The options for the fetch.
     * @returns A promise that resolves with a collection of the fetched calendar events.
     */
    async fetchMany(channelId: string, options: Omit<OptionQuery<CalendarEventsService["calendarEventReadMany"]>, "channelId">): Promise<Collection<number, CalendarEvent>> {
        const data = await this.client.rest.router.calendarEvents.calendarEventReadMany({
            channelId,
            ...options,
        });
        const calendarEvents = new Collection<number, CalendarEvent>();
        for (const calendarEvent of data.calendarEvents) {
            const newCalendar = new CalendarEvent(this.client, calendarEvent);
            calendarEvents.set(newCalendar.id, newCalendar);
            if (this.shouldCacheCalendar) this.client.calendars.cache.set(newCalendar.id, newCalendar);
        }

        return calendarEvents;
    }

    /**
     * Updates a calendar event.
     *
     * @param channelId The ID of the channel in which the event exists.
     * @param calendarEventId The ID of the event to update.
     * @param options The options for the update.
     * @returns A promise that resolves with the updated calendar event.
     */
    async update(channelId: string, calendarEventId: number, options: OptionBody<CalendarEventsService["calendarEventUpdate"]>): Promise<CalendarEvent> {
        const data = await this.client.rest.router.calendarEvents.calendarEventUpdate({
            channelId,
            calendarEventId,
            requestBody: options,
        });
        const existingCalendar = this.cache.get(calendarEventId);
        if (existingCalendar) return existingCalendar._update(data.calendarEvent);
        const newCalendar = new CalendarEvent(this.client, data.calendarEvent);
        if (this.shouldCacheCalendar) this.cache.set(newCalendar.id, newCalendar);
        return newCalendar;
    }

    /**
     * Delete a calendar event.
     *
     * @param channelId - The ID of the channel where the calendar event is located.
     * @param calendarEventId - The ID of the calendar event to delete.
     * @returns A Promise that resolves with the deleted calendar event or `undefined` if the event was not cached.
     */
    async delete(channelId: string, calendarEventId: number): Promise<CalendarEvent | null> {
        await this.client.rest.router.calendarEvents.calendarEventDelete({
            channelId,
            calendarEventId,
        });
        const cachedCalendar = this.cache.get(calendarEventId);
        return cachedCalendar ?? null;
    }

    /**
     * Get a single RSVP from a calendar event.
     *
     * @param channelId - The ID of the channel where the calendar event is located.
     * @param calendarEventId - The ID of the calendar event to get the RSVP from.
     * @param userId - The ID of the user who made the RSVP.
     * @param force - Whether to force a request to the API instead of returning the cached RSVP.
     * @returns A Promise that resolves with the requested RSVP.
     */
    async fetchRsvp(channelId: string, calendarEventId: number, userId: string, force?: boolean): Promise<CalendarEventRsvp> {
        if (!force) {
            const existingRsvp = this.client.calendars.cache.get(calendarEventId)?.rsvps?.get(userId);
            if (existingRsvp) return existingRsvp;
        }

        const data = await this.client.rest.router.calendarEvents.calendarEventRsvpRead({
            channelId,
            calendarEventId,
            userId,
        });
        const newRsvp = new CalendarEventRsvp(this.client, data.calendarEventRsvp);
        if (this.shouldCacheCalendar && this.shouldCacheCalendarRsvps) this.cache.get(newRsvp.calendarEventId)?.rsvps?.set(newRsvp.userId, newRsvp);
        return newRsvp;
    }

    /**
     * Fetch RSVPs for a calendar event.
     *
     * @param channelId - The ID of the channel where the calendar event is located.
     * @param calendarEventId - The ID of the calendar event to fetch RSVPs for.
     * @returns A Promise that resolves with a collection of RSVPs.
     */
    async fetchManyRsvps(channelId: string, calendarEventId: number): Promise<Collection<string, CalendarEventRsvp>> {
        const data = await this.client.rest.router.calendarEvents.calendarEventRsvpReadMany({
            channelId,
            calendarEventId,
        });
        const rsvpEvents = new Collection<string, CalendarEventRsvp>();
        for (const rsvpEvent of data.calendarEventRsvps) {
            if (this.shouldCacheCalendar && this.shouldCacheCalendarRsvps) {
                const cachedCalendar = this.cache.get(calendarEventId);
                cachedCalendar?.rsvps?.set(rsvpEvent.userId, new CalendarEventRsvp(this.client, rsvpEvent));
            }

            rsvpEvents.set(rsvpEvent.userId, new CalendarEventRsvp(this.client, rsvpEvent));
        }

        return rsvpEvents;
    }

    /**
     * Creates or updates an RSVP for a calendar event.
     *
     * @param channelId The ID of the channel.
     * @param calendarEventId The ID of the calendar event.
     * @param userId The ID of the user.
     * @param options The options for updating the RSVP.
     * @returns A promise that resolves with the updated or created RSVP.
     */
    async updateRsvp(channelId: string, calendarEventId: number, userId: string, options: OptionBody<CalendarEventsService["calendarEventRsvpUpdate"]>): Promise<CalendarEventRsvp> {
        const data = await this.client.rest.router.calendarEvents.calendarEventRsvpUpdate({
            channelId,
            calendarEventId,
            userId,
            requestBody: options,
        });

        const existingRsvp = this.cache.get(calendarEventId)?.rsvps?.get(userId);
        if (existingRsvp) return existingRsvp._update(data.calendarEventRsvp);

        const newRsvp = new CalendarEventRsvp(this.client, data.calendarEventRsvp);
        if (this.shouldCacheCalendar && this.shouldCacheCalendarRsvps) this.cache.get(calendarEventId)?.rsvps?.set(userId, newRsvp);
        return newRsvp;
    }

    /**
     * Creates or updates multiple RSVPs for a calendar event.
     *
     * @param channelId The ID of the channel.
     * @param calendarEventId The ID of the calendar event.
     * @param options The options for updating many RSVP.
     */
    async updateManyRsvp(channelId: string, calendarEventId: number, options: OptionBody<CalendarEventsService["calendarEventRsvpUpdateMany"]>): Promise<void> {
        await this.client.rest.router.calendarEvents.calendarEventRsvpUpdateMany({
            channelId,
            calendarEventId,
            requestBody: options,
        });
    }

    /**
     * Deletes an RSVP for a calendar event.
     *
     * @param channelId The ID of the channel.
     * @param calendarEventId The ID of the calendar event.
     * @param userId The ID of the user.
     * @returns A promise that resolves with the deleted RSVP or void if it was not cached.
     */
    async deleteRsvp(channelId: string, calendarEventId: number, userId: string): Promise<void> {
        await this.client.rest.router.calendarEvents.calendarEventRsvpDelete({
            channelId,
            calendarEventId,
            userId,
        });
        if (this.shouldCacheCalendar && this.shouldCacheCalendarRsvps) {
            const cachedCalendar = this.cache.get(calendarEventId);
            cachedCalendar?.rsvps?.delete(userId);
        }
    }
}
