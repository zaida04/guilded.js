/* istanbul ignore file */
/* eslint-disable */
import type { Announcement } from "../models/Announcement";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AnnouncementsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create an announcement
     * @returns any Success
     * @throws ApiError
     */
    public announcementCreate({
        channelId,
        requestBody,
    }: {
        channelId: string;
        requestBody: {
            /**
             * The title of the announcement
             */
            title: string;
            /**
             * The content of the announcement
             */
            content: Record<string, any> | string;
        };
    }): CancelablePromise<{
        announcement: Announcement;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/channels/{channelId}/announcements",
            path: {
                channelId: channelId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Get announcements
     * Results returned will be ordered ascending by the announcement's `createdAt`. `before` will filter based on the announcement's `createdAt`
     * @returns any Success
     * @throws ApiError
     */
    public announcementReadMany({ channelId, before, limit = 25 }: { channelId: string; before?: string; limit?: number }): CancelablePromise<{
        announcements: Array<Announcement>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/channels/{channelId}/announcements",
            path: {
                channelId: channelId,
            },
            query: {
                before: before,
                limit: limit,
            },
        });
    }

    /**
     * Read an announcement
     * @returns any Success
     * @throws ApiError
     */
    public announcementRead({ channelId, announcementId }: { channelId: string; announcementId: string }): CancelablePromise<{
        announcement: Announcement;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/channels/{channelId}/announcements/{announcementId}",
            path: {
                channelId: channelId,
                announcementId: announcementId,
            },
        });
    }

    /**
     * Update an announcement
     * @returns any Success
     * @throws ApiError
     */
    public announcementUpdate({
        channelId,
        announcementId,
        requestBody,
    }: {
        channelId: string;
        announcementId: string;
        requestBody: {
            /**
             * The title of the announcement
             */
            title?: string;
            /**
             * The content of the announcement
             */
            content?: Record<string, any> | string;
        };
    }): CancelablePromise<{
        announcement: Announcement;
    }> {
        return this.httpRequest.request({
            method: "PATCH",
            url: "/channels/{channelId}/announcements/{announcementId}",
            path: {
                channelId: channelId,
                announcementId: announcementId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Delete an announcement
     * @returns void
     * @throws ApiError
     */
    public announcementDelete({ channelId, announcementId }: { channelId: string; announcementId: string }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/channels/{channelId}/announcements/{announcementId}",
            path: {
                channelId: channelId,
                announcementId: announcementId,
            },
        });
    }
}
