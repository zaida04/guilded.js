/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DocComment } from "../models/DocComment";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class DocCommentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a comment on a doc
     * @returns any Success
     * @throws ApiError
     */
    public docCommentCreate({
        channelId,
        docId,
        requestBody,
    }: {
        channelId: string;
        docId: number;
        requestBody: {
            /**
             * The content of the doc comment
             */
            content: string;
        };
    }): CancelablePromise<{
        docComment: DocComment;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/channels/{channelId}/docs/{docId}/comments",
            path: {
                channelId: channelId,
                docId: docId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Get a doc's comments
     * @returns any Success
     * @throws ApiError
     */
    public docCommentReadMany({ channelId, docId }: { channelId: string; docId: number }): CancelablePromise<{
        docComments: Array<DocComment>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/channels/{channelId}/docs/{docId}/comments",
            path: {
                channelId: channelId,
                docId: docId,
            },
        });
    }

    /**
     * Get a comment on a doc
     * @returns any Success
     * @throws ApiError
     */
    public docCommentRead({ channelId, docId, docCommentId }: { channelId: string; docId: number; docCommentId: number }): CancelablePromise<{
        docComment: DocComment;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/channels/{channelId}/docs/{docId}/comments/{docCommentId}",
            path: {
                channelId: channelId,
                docId: docId,
                docCommentId: docCommentId,
            },
        });
    }

    /**
     * Update a doc comment
     * @returns any Success
     * @throws ApiError
     */
    public docCommentUpdate({
        channelId,
        docId,
        docCommentId,
        requestBody,
    }: {
        channelId: string;
        docId: number;
        docCommentId: number;
        requestBody: {
            /**
             * The content of the doc comment
             */
            content: string;
        };
    }): CancelablePromise<{
        docComment: DocComment;
    }> {
        return this.httpRequest.request({
            method: "PATCH",
            url: "/channels/{channelId}/docs/{docId}/comments/{docCommentId}",
            path: {
                channelId: channelId,
                docId: docId,
                docCommentId: docCommentId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Delete a doc comment
     * @returns void
     * @throws ApiError
     */
    public docCommentDelete({ channelId, docId, docCommentId }: { channelId: string; docId: number; docCommentId: number }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/channels/{channelId}/docs/{docId}/comments/{docCommentId}",
            path: {
                channelId: channelId,
                docId: docId,
                docCommentId: docCommentId,
            },
        });
    }
}
