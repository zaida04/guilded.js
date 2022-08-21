import { Collection } from "@discordjs/collection";
import type { RESTGetCalendarEventsBody, RESTPatchCalendarEventBody, RESTPostCalendarEventBody, RESTPatchCalendarEventRsvpBody } from "@guildedjs/guilded-api-typings";
import { CacheableStructManager } from "./CacheableStructManager";
import { CalendarEvent, CalendarEventRsvp } from "../../structures/CalendarEvent";

export class GlobalCalendarManager extends CacheableStructManager<number, CalendarEvent> {
    get shouldCacheCalendar() {
        return this.client.options?.cache?.cacheCalendars !== false;
    }

    get shouldCacheCalendarRSVPs() {
        return this.client.options?.cache?.cacheCalendarsRSVPs !== false;
    }

    /** Create a calendar event. */
    create(channelId: string, options: RESTPostCalendarEventBody): Promise<CalendarEvent> {
        return this.client.rest.router.createCalendarEvent(channelId, options).then((data) => {
            return new CalendarEvent(this.client, data.calendarEvent);
        });
    }

    /** Get a single calendar event. */
    fetch(channelId: string, calendarEventId: number, force?: boolean): Promise<CalendarEvent> {
        if (!force) {
            const existingCalendar = this.client.calendars.cache.get(calendarEventId);
            if (existingCalendar) return Promise.resolve(existingCalendar);
        }
        return this.client.rest.router.getCalendarEvent(channelId, calendarEventId).then((data) => {
            const newCalendar = new CalendarEvent(this.client, data.calendarEvent);
            if (this.shouldCacheCalendar) this.client.calendars.cache.set(newCalendar.id, newCalendar);
            return newCalendar;
        });
    }

    /** Get multiple calendar events. */
    fetchMany(channelId: string, options: RESTGetCalendarEventsBody): Promise<Collection<number, CalendarEvent>> {
        return this.client.rest.router.getCalendarEvents(channelId, options).then((data) => {
            const calendarEvents = new Collection<number, CalendarEvent>();
            for (const calendarEvent of data.calendarEvents) {
                const newCalendar = new CalendarEvent(this.client, calendarEvent);
                calendarEvents.set(newCalendar.id, newCalendar);
                if (this.shouldCacheCalendar) this.client.calendars.cache.set(newCalendar.id, newCalendar);
            }
            return calendarEvents;
        });
    }

    /** Update a calendar event. */
    update(channelId: string, calendarEventId: number, options: RESTPatchCalendarEventBody): Promise<CalendarEvent> {
        return this.client.rest.router.updateCalendarEvent(channelId, calendarEventId, options).then((data) => {
            return new CalendarEvent(this.client, data.calendarEvent);
        });
    }

    /** Delete a calendar event. */
    delete(channelId: string, calendarEventId: number): Promise<CalendarEvent | void> {
        return this.client.rest.router.deleteCalendarEvent(channelId, calendarEventId).then((data) => {  
            const cachedCalendar = this.cache.get(calendarEventId);
            return cachedCalendar ?? void 0;
        });
    }

    /** Fetch rsvps for a calendar event */
    fetchManyRSVPs(channelId: string, calendarEventId: number): Promise<Collection<string, CalendarEventRsvp>> {
        return this.client.rest.router.getCalendarEventRsvps(channelId, calendarEventId).then((data) => {
            const rsvpEvents = new Collection<string, CalendarEventRsvp>();
            for (const rsvpEvent of data.calendarEventRsvps) {
                if (this.shouldCacheCalendar && this.shouldCacheCalendarRSVPs) {
                    const cachedCalendar = this.cache.get(calendarEventId);
                    cachedCalendar?.rsvps.set(rsvpEvent.userId, new CalendarEventRsvp(this.client, rsvpEvent));
                }
                rsvpEvents.set(rsvpEvent.userId, new CalendarEventRsvp(this.client, rsvpEvent));
            }
            return rsvpEvents;
        });
    }

    /** Create or Update a rsvp for a calendar event */
    updateRSVP(channelId: string, calendarEventId: number, userId: string, options: RESTPatchCalendarEventRsvpBody): Promise<CalendarEventRsvp> {
        return this.client.rest.router.updateCalendarEventRvsp(channelId, calendarEventId, userId, options).then((data) => {
            console.log(data);
            if (this.shouldCacheCalendar && this.shouldCacheCalendarRSVPs) {
                const cachedCalendar = this.cache.get(calendarEventId);
                cachedCalendar?.rsvps.set(data.calendarEventRsvp.userId, new CalendarEventRsvp(this.client, data.calendarEventRsvp));
            }
            return new CalendarEventRsvp(this.client, data.calendarEventRsvp);
        });
    }
    
    /** Delete a rsvp for a calendar event */
    deleteRSVP(channelId: string, calendarEventId: number, userId: string): Promise<CalendarEventRsvp | void> {
        return this.client.rest.router.deleteCalendarEventRvsp(channelId, calendarEventId, userId).then((data) => {
            if (this.shouldCacheCalendar && this.shouldCacheCalendarRSVPs) {
                const cachedCalendar = this.cache.get(calendarEventId);
                const rsvp = cachedCalendar?.rsvps?.get(userId);
                return rsvp ?? void 0;
            }
            return void 0;
        });
    }
}
