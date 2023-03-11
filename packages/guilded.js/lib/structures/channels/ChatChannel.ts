import type { RESTPostServerWebhooksBody } from "@guildedjs/guilded-api-typings";
import type { Webhook } from "../Webhook";
import { Channel } from "./Channel";

/**
 * A channel used for chat communication.
 * @extends Channel
 */
export class ChatChannel extends Channel {
  /**
   * Create a new webhook for this channel.
   *
   * @param options - The options for creating the webhook.
   * @returns A promise that resolves with the created webhook.
   */
  createWebhook(options: RESTPostServerWebhooksBody): Promise<Webhook> {
    return this.client.webhooks.create(this.serverId, options);
  }
}
