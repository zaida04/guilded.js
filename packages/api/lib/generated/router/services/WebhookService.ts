/* istanbul ignore file */

/* eslint-disable */
import type { Webhook } from "../models/Webhook";

import { HttpRequest } from "../core/HttpRequest";
export class WebhookService {
  constructor(public readonly httpRequest: HttpRequest) {}

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
  }): Promise<{
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
  }): Promise<{
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
  public webhookRead({
    serverId,
    webhookId,
  }: {
    serverId: string;
    webhookId: string;
  }): Promise<{
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
  }): Promise<{
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
  public webhookDelete({
    serverId,
    webhookId,
  }: {
    serverId: string;
    webhookId: string;
  }): Promise<void> {
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
