/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Webhook } from "../models/Webhook";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class WebhookService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a webhook
     * @returns any Success
     * @throws ApiError
     */
    public webhookCreate({
        serverId,
        requestBody,
    }: {
        serverId: string;
        requestBody: {
            /**
             * The name of the webhook
             */
            name: string;
            /**
             * Channel ID to create the webhook in
             */
            channelId: string;
        };
    }): CancelablePromise<{
        webhook: Webhook;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/servers/{serverId}/webhooks",
            path: {
                serverId: serverId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Get a server's webhooks
     * Get a list of webhooks from a server.
     * @returns any Success
     * @throws ApiError
     */
    public webhookReadMany({
        serverId,
        channelId,
    }: {
        serverId: string;
        /**
         * ID of the channel you want to filter for webhooks
         */
        channelId: string;
    }): CancelablePromise<{
        webhooks: Array<Webhook>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/servers/{serverId}/webhooks",
            path: {
                serverId: serverId,
            },
            query: {
                channelId: channelId,
            },
        });
    }

    /**
     * Get a server's webhook
     * @returns any Success
     * @throws ApiError
     */
    public webhookRead({ serverId, webhookId }: { serverId: string; webhookId: string }): CancelablePromise<{
        webhook: Webhook;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/servers/{serverId}/webhooks/{webhookId}",
            path: {
                serverId: serverId,
                webhookId: webhookId,
            },
        });
    }

    /**
     * Update a webhook
     * @returns any Success
     * @throws ApiError
     */
    public webhookUpdate({
        serverId,
        webhookId,
        requestBody,
    }: {
        serverId: string;
        webhookId: string;
        requestBody: {
            /**
             * The name of the webhook
             */
            name: string;
            /**
             * The ID of the channel
             */
            channelId?: string;
        };
    }): CancelablePromise<{
        webhook: Webhook;
    }> {
        return this.httpRequest.request({
            method: "PUT",
            url: "/servers/{serverId}/webhooks/{webhookId}",
            path: {
                serverId: serverId,
                webhookId: webhookId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Delete a server webhook
     * @returns void
     * @throws ApiError
     */
    public webhookDelete({ serverId, webhookId }: { serverId: string; webhookId: string }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/servers/{serverId}/webhooks/{webhookId}",
            path: {
                serverId: serverId,
                webhookId: webhookId,
            },
        });
    }
}
