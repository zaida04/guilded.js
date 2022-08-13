import type { WSCalendarEventCreated, WSCalendarEventDeleted, WSCalendarEventUpdated } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { CalendarEvent } from "../../structures/CalendarEvent";
import { GatewayEventHandler } from "./GatewayEventHandler";

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
        if (this.client.calendars.shouldCacheCalendar) this.client.calendars.cache.delete(newCalendarEvent.id);
        return this.client.emit(constants.clientEvents.CALENDAR_EVENT_DELETED, newCalendarEvent);
    }
}
