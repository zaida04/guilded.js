import type { WSCalendarEventCreated, WSCalendarEventDeleted, WSCalendarEventUpdated, WSCalendarEventRsvpUpdated, WSCalendarEventRsvpManyUpdated, WSCalendarEventRsvpDeleted } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { CalendarEvent, CalendarEventRsvp } from "../../structures/CalendarEvent";
import { GatewayEventHandler } from "./GatewayEventHandler";
import { Collection } from "@discordjs/collection";

export class CalendarEventHandler extends GatewayEventHandler {
    calendarEventCreated(data: WSCalendarEventCreated): boolean {
        const existingCalendar = this.client.calendars.cache.get(data.d.calendarEvent.id);
        if (existingCalendar) return this.client.emit(constants.clientEvents.CALENDAR_EVENT_CREATED, existingCalendar);

        const newCalendarEvent = new CalendarEvent(this.client, data.d.calendarEvent);
        if (this.client.calendars.shouldCacheCalendar) this.client.calendars.cache.set(newCalendarEvent.id, newCalendarEvent);
        return this.client.emit(constants.clientEvents.CALENDAR_EVENT_CREATED, newCalendarEvent);
    }

    calendarEventUpdated(data: WSCalendarEventUpdated): boolean {
        const existingCalendar = this.client.calendars.cache.get(data.d.calendarEvent.id);
        const oldCalendar = existingCalendar?._clone();
        const updatedCalendar = existingCalendar?._update(data.d.calendarEvent);
        const newCalendarEvent = new CalendarEvent(this.client, data.d.calendarEvent);
        if (this.client.calendars.shouldCacheCalendar) this.client.calendars.cache.set(newCalendarEvent.id, newCalendarEvent);
        return this.client.emit(constants.clientEvents.CALENDAR_EVENT_UPDATED, newCalendarEvent, oldCalendar ?? null);
    }

    calendarEventDeleted(data: WSCalendarEventDeleted): boolean {
        const existingCalendar = this.client.calendars.cache.get(data.d.calendarEvent.id);
        const deleteCalendar = existingCalendar?._update(data.d.calendarEvent);
        const newCalendarEvent = new CalendarEvent(this.client, data.d.calendarEvent);
        if (this.client.options.cache?.removeCalendarsOnDelete) this.client.calendars.cache.delete(newCalendarEvent.id);
        return this.client.emit(constants.clientEvents.CALENDAR_EVENT_DELETED, newCalendarEvent);
    }
}

export class CalendarEventRsvpHandler extends GatewayEventHandler {
    calendarEventRsvpUpdated(data: WSCalendarEventRsvpUpdated): boolean {
        const existingCalendar = this.client.calendars.cache.get(data.d.calendarEventRsvp.calendarEventId);
        const existingCalendarRSVP = existingCalendar?.rsvps?.get(data.d.calendarEventRsvp.userId);
        const oldCalendarRSVP = existingCalendarRSVP?._clone();
        const updateCalendarRSVP = existingCalendarRSVP?._update(data.d.calendarEventRsvp);
        const newCalendarRSVP = new CalendarEventRsvp(this.client, data.d.calendarEventRsvp);
        if (this.client.calendars.shouldCacheCalendar && this.client.calendars.shouldCacheCalendarRSVPs) existingCalendar?.rsvps?.set(newCalendarRSVP.userId, newCalendarRSVP);
        return this.client.emit(constants.clientEvents.CALENDAR_EVENT_RSVP_UPDATED, newCalendarRSVP, oldCalendarRSVP ?? null);
    }

    calendarEventRsvpManyUpdated(data: WSCalendarEventRsvpManyUpdated): boolean {
        const rsvpCollection = new Map<string, CalendarEventRsvp>();
            for (const rsvp of data.d.calendarEventRsvps) {
                const newCalendarRsvp = new CalendarEventRsvp(this.client, rsvp);
                rsvpCollection.set(rsvp.userId, newCalendarRsvp);
                if (this.client.calendars.shouldCacheCalendar && this.client.calendars.shouldCacheCalendarRSVPs) {
                    const existingCalendar = this.client.calendars.cache.get(rsvp.calendarEventId);
                    existingCalendar?.rsvps?.set(rsvp.userId, newCalendarRsvp);
            }
        }
        return this.client.emit(constants.clientEvents.CALENDAR_EVENT_RSVP_MANY_UPDATED, rsvpCollection);
    }

    calendarEventRsvpDeleted(data: WSCalendarEventRsvpDeleted): boolean {
        const existingCalendar = this.client.calendars.cache.get(data.d.calendarEventRsvp.calendarEventId);
        const existingCalendarRSVP = existingCalendar?.rsvps?.get(data.d.calendarEventRsvp.userId);
        existingCalendarRSVP?._update(data.d.calendarEventRsvp);
        const newCalendarRsvp = new CalendarEventRsvp(this.client, data.d.calendarEventRsvp);
        if (this.client.options.cache?.removeCalendarRsvpOnDelete) {
            const currentCalendar = this.client.calendars.cache.get(data.d.calendarEventRsvp.calendarEventId);
            currentCalendar?.rsvps?.delete(data.d.calendarEventRsvp.userId);
        }
        return this.client.emit(constants.clientEvents.CALENDAR_EVENT_RSVP_DELETED, newCalendarRsvp);
    }
}