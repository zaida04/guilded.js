import type { CalendarEventPayload, CalendarEventRsvpPayload } from "../structs/CalendarEvent";

/**
 * POST
 * /channels/:channelId/events
 */
export type RESTPostCalendarEventBody = {
    color?: number;
    description?: string;
    duration?: number;
    isPrivate?: boolean;
    location?: string;
    name: string;
    rsvpLimit?: number;
    startsAt?: string;
    url?: string;
}
export type RESTPostCalendarEventResult = {
    calendarEvent: CalendarEventPayload;
}

/**
 * GET
 * /channels/:channelId/events
 */
export type RESTGetCalendarEventsBody = {
    after?: string;
    before?: string;
    limit?: number;
}
export type RESTGetCalendarEventsResult = {
    calendarEvents: CalendarEventPayload[];
}

/**
 * GET
 * /channels/:channelId/events/:calendarEventId
 */
export type RESTGetCalendarEventResult = {
    calendarEvent: CalendarEventPayload;
}

/**
 * PATCH
 * /channels/:channelId/events/:calendarEventsId
 */
export type RESTPatchCalendarEventBody = {
    color?: number;
    description?: string;
    duration?: number;
    isPrivate?: boolean;
    location?: string;
    name?: string;
    startsAt?: string;
    url?: string;
}
export type RESTPatchCalendarEventResult = {
    calendarEvent: CalendarEventPayload;
}

/**
 * DELETE
 * /channels/:channelId/events/:calendarEventId
 */
export type RESTDeleteCalendarEventResult = never;

/**
 * GET
 * /channels/:channelId/events/:calendarEventId/rsvps
 */
export type RESTGetCalendarEventRsvpsResult = {
    calendarEventRsvps: CalendarEventRsvpPayload[];
}

/**
 * GET
 * /channels/:channelId/events/:calendarEventId/rsvps/:userId
 */
export type RESTGetCalendarEventRsvpResult = {
    calendarEventRsvp: CalendarEventRsvpPayload;
}

/**
 * PATCH
 * /channels/:channelId/events/:calendarEventId/rsvps/:userId
 */
export type RESTPatchCalendarEventRsvpBody = {
    status: string;
}
export type RESTPatchCalendarEventRsvpResult = {
    calendarEventRsvp: CalendarEventRsvpPayload;
}

/**
 * DELETE
 * /channels/:channelId/events/:calendarEventId/rsvps/:userId
 */
export type RESTDeleteCalendarEventRsvpResult = never;
