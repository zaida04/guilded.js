import { Collection } from "@discordjs/collection";
import { Webhook } from "../../structures/Webhook";
import { CacheableStructManager } from "./CacheableStructManager";
import { OptionBody } from "../../typings";
import { WebhookService } from "@guildedjs/api";

/**
 * A manager for interacting with global webhooks. You can retrieve webhooks from the .cache property
 * @extends CacheableStructManager
 */
export class GlobalWebhookManager extends CacheableStructManager<
  string,
  Webhook
> {
  get shouldCacheWebhook() {
    return this.client.options.cache?.cacheWebhooks !== false;
  }

  /**
   * Create a webhook
   * @param serverId The ID of the server to create the webhook for
   * @param options The options for creating the webhook
   * @returns A Promise that resolves to the created webhook
   */
  create(
    serverId: string,
    options: OptionBody<WebhookService["webhookCreate"]>
  ): Promise<Webhook> {
    return this.client.rest.router.webhook
      .webhookCreate({ serverId, requestBody: options })
      .then((data) => {
        // This is in the case of which the WS gateway beats us to adding the message to the cache. If they haven't, then we do it ourselves.
        const existingWebhook = this.client.webhooks.cache.get(data.webhook.id);
        if (existingWebhook) return existingWebhook;
        const newWebhook = new Webhook(this.client, data.webhook);
        if (this.shouldCacheWebhook) this.cache.set(newWebhook.id, newWebhook);
        return newWebhook;
      });
  }
  /**
   * Get a server's webhooks
   * @param serverId The ID of the server to get webhooks for
   * @param channelId The ID of the channel to get webhooks for
   * @returns A Promise that resolves to a Collection of Webhooks
   */
  fetchMany(
    serverId: string,
    channelId: string
  ): Promise<Collection<string, Webhook>> {
    return this.client.rest.router.webhook
      .webhookReadMany({ serverId, channelId })
      .then((data) => {
        const webhooks = new Collection<string, Webhook>();
        for (const webhook of data.webhooks) {
          const newWebhook = new Webhook(this.client, webhook);
          webhooks.set(newWebhook.id, newWebhook);
          if (this.shouldCacheWebhook)
            this.cache.set(newWebhook.id, newWebhook);
        }
        return webhooks;
      });
  }

  /**
   * Get a webhook
   * @param serverId The ID of the server the webhook is in
   * @param webhookId The ID of the webhook
   * @param force Whether to skip the cache check and request the API
   * @returns A Promise that resolves to the fetched webhook
   */
  fetch(
    serverId: string,
    webhookId: string,
    force?: boolean
  ): Promise<Webhook> {
    if (!force) {
      const existingWebhook = this.client.webhooks.cache.get(webhookId);
      if (existingWebhook) return Promise.resolve(existingWebhook);
    }
    return this.client.rest.router.webhook
      .webhookRead({ serverId, webhookId })
      .then((data) => {
        const newWebhook = new Webhook(this.client, data.webhook);
        if (this.shouldCacheWebhook) this.cache.set(newWebhook.id, newWebhook);
        return newWebhook;
      });
  }

  /**
   * Update a webhook
   * @param serverId The ID of the server the webhook is in
   * @param webhookId The ID of the webhook to update
   * @param options The options for updating the webhook
   * @returns A Promise that resolves to the updated Webhook
   */
  update(
    serverId: string,
    webhookId: string,
    options: OptionBody<WebhookService["webhookUpdate"]>
  ): Promise<Webhook> {
    return this.client.rest.router.webhook
      .webhookUpdate({ serverId, webhookId, requestBody: options })
      .then((data) => {
        return (
          this.cache.get(data.webhook.id)?._update(data.webhook) ??
          new Webhook(this.client, data.webhook)
        );
      });
  }

  /**
   * Delete a webhook
   * @param serverId The ID of the server the webhook is in
   * @param webhookId The ID of the webhook to delete
   * @returns A Promise that resolves with the deleted webhook, or null if it was not cached
   */
  delete(serverId: string, webhookId: string): Promise<void> {
    return this.client.rest.router.webhook.webhookDelete({
      serverId,
      webhookId,
    });
  }
}
