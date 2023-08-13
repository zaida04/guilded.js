/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CalendarEventRsvp = {
    /**
     * The ID of the calendar event
     */
    calendarEventId: number;
    /**
     * The ID of the channel
     */
    channelId: string;
    /**
     * The ID of the server
     */
    serverId: string;
    /**
     * The ID of the user
     */
    userId: string;
    /**
     * The status of the RSVP
     */
    status: "going" | "maybe" | "declined" | "invited" | "waitlisted" | "not responded";
    /**
     * The ID of the user who created this RSVP
     */
    createdBy: string;
    /**
     * The ISO 8601 timestamp that the RSVP was created at
     */
    createdAt: string;
    /**
     * The ID of the user who updated this RSVP
     */
    updatedBy?: string;
    /**
     * The ISO 8601 timestamp that the RSVP was updated at, if relevant
     */
    updatedAt?: string;
};
