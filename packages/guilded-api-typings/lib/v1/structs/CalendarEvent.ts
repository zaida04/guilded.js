import type { MentionsPayload } from "./Message";

export interface CalendarEventCancellationPayload {
    /** The description of event cancellation (min 1; max 140) */
    description?: string;
    /** The ID of the user who created this event cancellation */
    createdBy?: string;
}

export interface CalendarEventPayload {
    /** The ID of the calendar event */
    id: number;
    /** The ID of the server */
    serverId: string;
    /** The ID of the channel */
    channelId: string;
    /** The name of the event length: (min 1; max 60) */
    name: string;
    /** The description of the event length: (min 1; max 8000) */
    description?: string;
    /** The location of the event */
    location?: string;
    /** A URL to associate with the event */
    url?: string;
    /** The color of the event when viewed in the calendar (min 0; max 16777215) */
    color?: number;
    /** The number of RSVPs to allow before waitlisting RSVPs (min 1) */
    rsvpLimit?: number;
    /** The ISO 8601 timestamp that the event starts at */
    startsAt: string;
    /** The duration of the event IN MINUTES (min 1) */
    duration?: number;
    /** If the event has a limited view */
    isPrivate?: boolean;
    /** Collection of fetched rsvps if cached */
    rsvps?: CalendarEventRsvpPayload[];
    mentions?: MentionsPayload;
    /** The ISO 8601 timestamp that the event was created at */
    createdAt: string;
    /** The ID of the user who created this event */
    createdBy: string;
    cancellation?: CalendarEventCancellationPayload;
}

export interface CalendarEventRsvpPayload {
    id: string;
    /** The ID of the calendar event */
    calendarEventId: number;
    /** The ID of the channel */
    channelId: string;
    /** The ID of the server */
    serverId: string;
    /** The ID of the user */
    userId: string;
    /** The status of the RSVP ("going", "maybe", "declined", "invited", "waitlisted", or "not responded")*/
    status: string;
    /** The ID of the user who created this RSVP */
    createdBy: string;
    /** The ISO 8601 timestamp that the RSVP was created at */
    createdAt: string;
    /** The ID of the user who updated this RSVP */
    updatedBy?: string;
    /** The ISO 8601 timestamp that the RSVP was updated at, if relevant */
    updatedAt?: string;
}
