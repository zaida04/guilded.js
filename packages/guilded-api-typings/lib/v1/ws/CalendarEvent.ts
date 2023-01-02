import type { CalendarEventPayload, CalendarEventRsvpPayload } from "../structs/CalendarEvent";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export type WSCalendarEventCreated = SkeletonWSPayload & {
    d: {
        calendarEvent: CalendarEventPayload;
        serverId: string;
    };
    t: WSEvent["CalendarEventCreated"];
}
export type WSCalendarEventUpdated = SkeletonWSPayload & {
    d: {
        calendarEvent: CalendarEventPayload;
        serverId: string;
    };
    t: WSEvent["CalendarEventUpdated"];
}
export type WSCalendarEventDeleted = SkeletonWSPayload & {
    d: {
        calendarEvent: CalendarEventPayload;
        serverId: string;
    };
    t: WSEvent["CalendarEventDeleted"];
}

export type WSCalendarEventRsvpUpdated = SkeletonWSPayload & {
    d: {
        calendarEventRsvp: CalendarEventRsvpPayload;
        serverId: string;
    };
    t: WSEvent["CalendarEventRsvpUpdated"];
}

export type WSCalendarEventRsvpManyUpdated = SkeletonWSPayload & {
    d: {
        calendarEventRsvps: CalendarEventRsvpPayload[];
        serverId: string;
    };
    t: WSEvent["CalendarEventRsvpManyUpdated"];
}

export type WSCalendarEventRsvpDeleted = SkeletonWSPayload & {
    d: {
        calendarEventRsvp: CalendarEventRsvpPayload;
        serverId: string;
    };
    t: WSEvent["CalendarEventRsvpDeleted"];
}
