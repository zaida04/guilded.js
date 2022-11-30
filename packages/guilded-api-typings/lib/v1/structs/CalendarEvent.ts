import type { MentionsPayload } from "./Message";

export type CalendarEventCancellationPayload = {
    /**
     * The ID of the user who created this event cancellation
     */
    createdBy?: string;
    /**
     * The description of event cancellation (min 1; max 140)
     */
    description?: string;
}

export type CalendarEventPayload = {
    cancellation?: CalendarEventCancellationPayload;
    /**
     * The ID of the channel
     */
    channelId: string;
    /**
     * The color of the event when viewed in the calendar (min 0; max 16777215)
     */
    color?: number;
    /**
     * The ISO 8601 timestamp that the event was created at
     */
    createdAt: string;
    /**
     * The ID of the user who created this event
     */
    createdBy: string;
    /**
     * The description of the event length: (min 1; max 8000)
     */
    description?: string;
    /**
     * The duration of the event IN MINUTES (min 1)
     */
    duration?: number;
    /**
     * The ID of the calendar event
     */
    id: number;
    /**
     * If the event has a limited view
     */
    isPrivate?: boolean;
    /**
     * The location of the event
     */
    location?: string;
    mentions?: MentionsPayload;
    /**
     * The name of the event length: (min 1; max 60)
     */
    name: string;
    /**
     * The number of rsvps to allow before waitlisting rsvps (min 1)
     */
    rsvpLimit?: number;
    /**
     * Collection of fetched rsvps if cached
     */
    rsvps?: CalendarEventRsvpPayload[];
    /**
     * The ID of the server
     */
    serverId: string;
    /**
     * The ISO 8601 timestamp that the event starts at
     */
    startsAt: string;
    /**
     * A URL to associate with the event
     */
    url?: string;
}

export type CalendarEventRsvpPayload = {
    /**
     * The ID of the calendar event
     */
    calendarEventId: number;
    /**
     * The ID of the channel
     */
    channelId: string;
    /**
     * The ISO 8601 timestamp that the rsvp was created at
     */
    createdAt: string;
    /**
     * The ID of the user who created this rsvp
     */
    createdBy: string;
    id: string;
    /**
     * The ID of the server
     */
    serverId: string;
    /**
     * The status of the rsvp ("going", "maybe", "declined", "invited", "waitlisted", or "not responded")
     */
    status: string;
    /**
     * The ISO 8601 timestamp that the rsvp was updated at, if relevant
     */
    updatedAt?: string;
    /**
     * The ID of the user who updated this rsvp
     */
    updatedBy?: string;
    /**
     * The ID of the user
     */
    userId: string;
}
