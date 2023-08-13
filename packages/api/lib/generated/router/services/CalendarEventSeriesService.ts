/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class CalendarEventSeriesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Update a calendar event series
     * @returns void
     * @throws ApiError
     */
    public calendarEventSeriesUpdate({
        channelId,
        calendarEventSeriesId,
        requestBody,
    }: {
        channelId: string;
        calendarEventSeriesId: string;
        requestBody: {
            /**
             * The name of the event
             */
            name?: string;
            /**
             * The description of the event
             */
            description?: string;
            /**
             * The location of the event
             */
            location?: string;
            /**
             * The ISO 8601 timestamp that the event starts at
             */
            startsAt?: string;
            /**
             * A URL to associate with the event
             */
            url?: string;
            /**
             * The integer value corresponds to the decimal RGB representation for the color. The color of the event when viewing in the calendar
             */
            color?: number;
            /**
             * Does the event last all day? If passed with `duration`, `duration` will only be applied if it is an interval of minutes represented in days (e.g., `duration: 2880`)
             */
            isAllDay?: boolean;
            /**
             * When disabled, users will not be able to RSVP to the event
             */
            rsvpDisabled?: boolean;
            /**
             * The number of RSVPs to allow before waitlisting RSVPs
             */
            rsvpLimit?: number;
            /**
             * When `rsvpLimit` is set, users from the waitlist will be added as space becomes available in the event
             */
            autofillWaitlist?: boolean;
            /**
             * The duration of the event _**in minutes**_
             */
            duration?: number;
            isPrivate?: boolean;
            /**
             * The role IDs to restrict the event to. Passing an empty array will clear the role IDs on the event
             */
            roleIds?: Array<number>;
            repeatInfo?: {
                /**
                 * How often you want your event to repeat (important note: this will repeat for the next 180 days unless custom is defined)
                 */
                type: "once" | "everyDay" | "everyWeek" | "everyMonth" | "custom";
                /**
                 * Apply further clarification to your events. This **must** have `type` set to `custom`
                 */
                every?: {
                    /**
                     * How often between your interval the event should repeat. For example, 1 would be every interval, 2 would be every second occurrence of the interval
                     */
                    count: number;
                    /**
                     * Coupled with `count`, this indicates the time range you are repeating your event over
                     */
                    interval: "day" | "month" | "year" | "week";
                };
                /**
                 * Used to control the end date of the event repeat (only used when `type` is `custom`; if used with `endDate`, the earliest resultant date of the two will be used)
                 */
                endsAfterOccurrences?: number;
                /**
                 * The ISO 8601 timestamp that the event ends at. Used to control the end date of the event repeat (only used when `type` is `custom`; if used with `endsAfterOccurrences`, the earliest resultant date of the two will be used)
                 */
                endDate?: string;
                /**
                 * Used to control the day of the week that the event should repeat on (only used when `type` is `custom` and when `every.interval` is `week`)
                 */
                on?: Array<"sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday">;
            };
            /**
             * Control the updating of the series from the `calendarEventId` forward. If not defined, it will edit all events
             */
            calendarEventId?: number;
        };
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "PATCH",
            url: "/channels/{channelId}/event_series/{calendarEventSeriesId}",
            path: {
                channelId: channelId,
                calendarEventSeriesId: calendarEventSeriesId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Delete a calendar event series
     * @returns void
     * @throws ApiError
     */
    public calendarEventSeriesDelete({
        channelId,
        calendarEventSeriesId,
        requestBody,
    }: {
        channelId: string;
        calendarEventSeriesId: string;
        requestBody?: {
            /**
             * Control the deletion of the series from the `calendarEventId` forward. If not defined, it will delete all events
             */
            calendarEventId?: number;
        };
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/channels/{channelId}/event_series/{calendarEventSeriesId}",
            path: {
                channelId: channelId,
                calendarEventSeriesId: calendarEventSeriesId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }
}
