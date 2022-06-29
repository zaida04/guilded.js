import type { CalendarEventPayload } from "../structs/CalendarEvent";

/**
 * POST
 * /channels/:channelId/events
 */
export interface RESTPostCalendarEventBody {
    name: string;
    description?: string;
    location?: string;
    startsAt?: string;
    url?: string;
    color?: number;
    duration?: number;
    isPrivate?: boolean;
}
export interface RESTPostCalendarEventResult {
    calendarEvent: CalendarEventPayload;
}

/**
 * GET
 * /channels/:channelId/events
 */
export interface RESTGetCalendarEventsBody {
    before?: string;
    after?: string;
    limit?: number;
}
export interface RESTGetCalendarEventsResult {
    calendarEvents: CalendarEventPayload[];
}

/**
 * GET
 * /channels/:channelId/events/:calendarEventId
 */
export interface RESTGetCalendarEventResult {
    calendarEvent: CalendarEventPayload;
}

/**
 * PATCH
 * /channels/:channelId/events/:calendarEventsId
 */
export interface RESTPatchCalendarEventBody {
    name?: string;
    description?: string;
    location?: string;
    startsAt?: string;
    url?: string;
    color?: number;
    duration?: number;
    isPrivate?: boolean;
}
export interface RESTPatchCalendarEventResult {
    calendarEvent: CalendarEventPayload;
}

/**
 * DELETE
 * /channels/:channelId/events/:calendarEventId
 */
export type RESTDeleteCalendarEventResult = never;
