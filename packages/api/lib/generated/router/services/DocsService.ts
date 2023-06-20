/* istanbul ignore file */
/* eslint-disable */
import type { Doc } from "../models/Doc";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class DocsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a doc
     * @returns any Success
     * @throws ApiError
     */
    public docCreate({
        channelId,
        requestBody,
    }: {
        channelId: string;
        requestBody: {
            /**
             * The title of the doc
             */
            title: string;
            /**
             * The content of the doc
             */
            content: Record<string, any> | string;
        };
    }): CancelablePromise<{
        doc: Doc;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/channels/{channelId}/docs",
            path: {
                channelId: channelId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Get docs
     * Results returned will be ordered descending by the doc's `updatedAt`. `before` will filter based on the doc's `updatedAt`
     * @returns any Success
     * @throws ApiError
     */
    public docReadMany({ channelId, before, limit = 25 }: { channelId: string; before?: string; limit?: number }): CancelablePromise<{
        docs: Array<Doc>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/channels/{channelId}/docs",
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
     * Get a doc
     * @returns any Success
     * @throws ApiError
     */
    public docRead({ channelId, docId }: { channelId: string; docId: number }): CancelablePromise<{
        doc: Doc;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/channels/{channelId}/docs/{docId}",
            path: {
                channelId: channelId,
                docId: docId,
            },
        });
    }

    /**
     * Update a doc
     * @returns any Success
     * @throws ApiError
     */
    public docUpdate({
        channelId,
        docId,
        requestBody,
    }: {
        channelId: string;
        docId: number;
        requestBody: {
            /**
             * The title of the doc
             */
            title: string;
            /**
             * The content of the doc
             */
            content: string;
        };
    }): CancelablePromise<{
        doc: Doc;
    }> {
        return this.httpRequest.request({
            method: "PUT",
            url: "/channels/{channelId}/docs/{docId}",
            path: {
                channelId: channelId,
                docId: docId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Delete a doc
     * @returns void
     * @throws ApiError
     */
    public docDelete({ channelId, docId }: { channelId: string; docId: number }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/channels/{channelId}/docs/{docId}",
            path: {
                channelId: channelId,
                docId: docId,
            },
        });
    }
}
