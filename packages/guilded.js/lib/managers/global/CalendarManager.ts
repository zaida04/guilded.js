import Collection from "@discordjs/collection";
import type { RESTGetCalendarEventsBody, RESTPatchCalendarEventBody, RESTPostCalendarEventBody } from "@guildedjs/guilded-api-typings";
import { Base } from "../../structures";
import { CalendarEvent } from "../../structures/CalendarEvent";

export class GlobalCalendarManager extends Base<number, CalendarEvent> {
    /** Create a calendar event. */
    create(channelId: string, options: RESTPostCalendarEventBody): Promise<CalendarEvent> {
        return this.client.rest.router.createCalendarEvent(channelId, options).then((data) => {
            return new CalendarEvent(this.client, data.calendarEvent);
        });
    }

    /** Get a single calendar event. */
    fetch(channelId: string, calendarEventId: number): Promise<CalendarEvent> {
        return this.client.rest.router.getCalendarEvent(channelId, calendarEventId).then((data) => {
            return new CalendarEvent(this.client, data.calendarEvent);
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
            return void 0;
        });
    }
}
