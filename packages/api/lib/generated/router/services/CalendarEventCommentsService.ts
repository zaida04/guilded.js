/* istanbul ignore file */
/* eslint-disable */
import type { CalendarEventComment } from "../models/CalendarEventComment";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class CalendarEventCommentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a comment on an event
     * @returns any Success
     * @throws ApiError
     */
    public calendarEventCommentCreate({
        channelId,
        calendarEventId,
        requestBody,
    }: {
        channelId: string;
        calendarEventId: number;
        requestBody: {
            /**
             * The content of the calendar event comment
             */
            content: string;
        };
    }): CancelablePromise<{
        calendarEventComment: CalendarEventComment;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/channels/{channelId}/events/{calendarEventId}/comments",
            path: {
                channelId: channelId,
                calendarEventId: calendarEventId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Get a calendar event's comments
     * @returns any Success
     * @throws ApiError
     */
    public calendarEventCommentReadMany({ channelId, calendarEventId }: { channelId: string; calendarEventId: number }): CancelablePromise<{
        calendarEventComments: Array<CalendarEventComment>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/channels/{channelId}/events/{calendarEventId}/comments",
            path: {
                channelId: channelId,
                calendarEventId: calendarEventId,
            },
        });
    }

    /**
     * Get a comment on the calendar event
     * @returns any Success
     * @throws ApiError
     */
    public calendarEventCommentRead({ channelId, calendarEventId, calendarEventCommentId }: { channelId: string; calendarEventId: number; calendarEventCommentId: number }): CancelablePromise<{
        calendarEventComment: CalendarEventComment;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/channels/{channelId}/events/{calendarEventId}/comments/{calendarEventCommentId}",
            path: {
                channelId: channelId,
                calendarEventId: calendarEventId,
                calendarEventCommentId: calendarEventCommentId,
            },
        });
    }

    /**
     * Update a calendar event comment
     * @returns any Success
     * @throws ApiError
     */
    public calendarEventCommentUpdate({
        channelId,
        calendarEventId,
        calendarEventCommentId,
        requestBody,
    }: {
        channelId: string;
        calendarEventId: number;
        calendarEventCommentId: number;
        requestBody: {
            /**
             * The content of the calendar event comment
             */
            content: string;
        };
    }): CancelablePromise<{
        calendarEventComment: CalendarEventComment;
    }> {
        return this.httpRequest.request({
            method: "PATCH",
            url: "/channels/{channelId}/events/{calendarEventId}/comments/{calendarEventCommentId}",
            path: {
                channelId: channelId,
                calendarEventId: calendarEventId,
                calendarEventCommentId: calendarEventCommentId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Delete a calendar event comment
     * @returns void
     * @throws ApiError
     */
    public calendarEventCommentDelete({ channelId, calendarEventId, calendarEventCommentId }: { channelId: string; calendarEventId: number; calendarEventCommentId: number }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/channels/{channelId}/events/{calendarEventId}/comments/{calendarEventCommentId}",
            path: {
                channelId: channelId,
                calendarEventId: calendarEventId,
                calendarEventCommentId: calendarEventCommentId,
            },
        });
    }
}
