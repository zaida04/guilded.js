import type { WSCalendarEventCreated, WSCalendarEventDeleted, WSCalendarEventUpdated } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { CalendarEvent } from "../../structures/CalendarEvent";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class CalendarEventHandler extends GatewayEventHandler {
    calendarEventCreated(data: WSCalendarEventCreated): boolean {
        const newCalendarEvent = new CalendarEvent(this.client, data.d.calendarEvent);
        return this.client.emit(constants.clientEvents.CALENDAR_EVENT_CREATED, newCalendarEvent);
    }

    calendarEventUpdated(data: WSCalendarEventUpdated): boolean {
        const newCalendarEvent = new CalendarEvent(this.client, data.d.calendarEvent);
        return this.client.emit(constants.clientEvents.CALENDAR_EVENT_UPDATED, newCalendarEvent);
    }

    calendarEventDeleted(data: WSCalendarEventDeleted): boolean {
        const newCalendarEvent = new CalendarEvent(this.client, data.d.calendarEvent);
        return this.client.emit(constants.clientEvents.CALENDAR_EVENT_DELETED, newCalendarEvent);
    }
}
