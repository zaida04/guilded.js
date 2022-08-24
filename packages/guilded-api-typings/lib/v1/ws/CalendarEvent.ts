import type { CalendarEventPayload, CalendarEventRsvpPayload } from "../structs/CalendarEvent";
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

export interface WSCalendarEventRsvpUpdated extends SkeletonWSPayload {
    d: {
        serverId: string;
        calendarEventRsvp: CalendarEventRsvpPayload;
    };
    t: WSEvent["CalendarEventRsvpUpdated"];
}

export interface WSCalendarEventRsvpManyUpdated extends SkeletonWSPayload {
    d: {
        serverId: string;
        calendarEventRsvps: CalendarEventRsvpPayload[];
    };
    t: WSEvent["CalendarEventRsvpManyUpdated"];
}

export interface WSCalendarEventRsvpDeleted extends SkeletonWSPayload {
    d: {
        serverId: string;
        calendarEventRsvp: CalendarEventRsvpPayload;
    };
    t: WSEvent["CalendarEventRsvpDeleted"];
}
