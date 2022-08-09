import { Collection } from "@discordjs/collection";
import type { RESTGetCalendarEventsBody, RESTPatchCalendarEventBody, RESTPostCalendarEventBody } from "@guildedjs/guilded-api-typings";
import { CacheableStructManager } from "./CacheableStructManager";
import { CalendarEvent } from "../../structures/CalendarEvent";

export class GlobalCalendarManager extends CacheableStructManager<number, CalendarEvent> {
    get shouldCacheCalendar() {
        return this.client.options?.cache?.cacheCalendars !== false;
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
            this.client.calendars.cache.set(newCalendar.id, newCalendar);
            return newCalendar;
        });
    }

    /** Get multiple calendar events. */
    fetchMany(channelId: string, options: RESTGetCalendarEventsBody): Promise<Collection<number, CalendarEvent>> {
        return this.client.rest.router.getCalendarEvents(channelId, options).then((data) => {
            const calendarEvents = new Collection<number, CalendarEvent>();
            for (const calendarEvent of data.calendarEvents) {
                calendarEvents.set(calendarEvent.id, new CalendarEvent(this.client, calendarEvent));
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
    delete(channelId: string, calendarEventId: number): Promise<void> {
        return this.client.rest.router.deleteCalendarEvent(channelId, calendarEventId).then((data) => {
            /* Delete from Cache???
            this.client.calendars.cache.delete(calendarEventId);
            */
            return void 0;
        });
    }
}
