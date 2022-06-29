import type { CalendarEventPayload } from "../structs/CalendarEvent";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSCalendarEventCreated extends SkeletonWSPayload {
    d: {
        serverId: string;
        calendarEvent: CalendarEventPayload;
    };
    t: WSEvent["CalendarEventCreated"];
}
export interface WSCalendarEventUpdated extends SkeletonWSPayload {
    d: {
        serverId: string;
        calendarEvent: CalendarEventPayload;
    };
    t: WSEvent["CalendarEventUpdated"];
}
export interface WSCalendarEventDeleted extends SkeletonWSPayload {
    d: {
        serverId: string;
        calendarEvent: CalendarEventPayload;
    };
    t: WSEvent["CalendarEventDeleted"];
}
