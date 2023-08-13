/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Emote } from "./Emote";

export type CalendarEventCommentReaction = {
    /**
     * The ID of the channel
     */
    channelId: string;
    /**
     * The ID of the user who added the reaction
     */
    createdBy: string;
    emote: Emote;
    /**
     * The ID of the calendar event
     */
    calendarEventId: number;
    /**
     * The ID of the calendar event comment
     */
    calendarEventCommentId: number;
};
