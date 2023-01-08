import { Collection } from "@discordjs/collection";
import type { RESTPostServerWebhooksBody, RESTPutServerWebhookBody } from "@guildedjs/guilded-api-typings";
import { Webhook } from "../../structures/Webhook";
import { CacheableStructManager } from "./CacheableStructManager";

export class GlobalWebhookManager extends CacheableStructManager<string, Webhook> {
	get _shouldCacheWebhook() {
		return this.client.options.cache?.cacheWebhooks !== false;
	}

	/** Create a webhook */
	create(serverId: string, options: RESTPostServerWebhooksBody): Promise<Webhook> {
		return this.client.rest.router.createWebhook(serverId, options).then((data) => {
			// This is in the case of which the WS gateway beats us to adding the message to the cache. If they haven't, then we do it ourselves.
			const existingWebhook = this.client.webhooks.cache.get(data.webhook.id);
			if (existingWebhook) return existingWebhook;
			const newWebhook = new Webhook(this.client, data.webhook);
			if (this._shouldCacheWebhook) this.cache.set(newWebhook.id, newWebhook);
			return newWebhook;
		});
	}

	/** Get a server's webhooks */
	fetchMany(serverId: string, channelId?: string): Promise<Collection<string, Webhook>> {
		return this.client.rest.router.getWebhooks(serverId, channelId).then((data) => {
			const webhooks = new Collection<string, Webhook>();
			for (const webhook of data.webhooks) {
				const newWebhook = new Webhook(this.client, webhook);
				webhooks.set(newWebhook.id, newWebhook);
				if (this._shouldCacheWebhook) this.cache.set(newWebhook.id, newWebhook);
			}
			return webhooks;
		});
	}

	/** Get a webhook */
	fetch(serverId: string, webhookId: string, force?: boolean): Promise<Webhook> {
		if (!force) {
			const existingWebhook = this.client.webhooks.cache.get(webhookId);
			if (existingWebhook) return Promise.resolve(existingWebhook);
		}
		return this.client.rest.router.getWebhook(serverId, webhookId).then((data) => {
			const newWebhook = new Webhook(this.client, data.webhook);
			if (this._shouldCacheWebhook) this.cache.set(newWebhook.id, newWebhook);
			return newWebhook;
		});
	}

	/** Update a webhook */
	update(serverId: string, webhookId: string, options: RESTPutServerWebhookBody): Promise<Webhook> {
		return this.client.rest.router.updateWebhook(serverId, webhookId, options).then((data) => {
			return this.cache.get(data.webhook.id)?._update(data.webhook) ?? new Webhook(this.client, data.webhook);
		});
	}

	/** Delete a webhook */
	delete(serverId: string, webhookId: string): Promise<Webhook | null> {
		return this.client.rest.router.deleteWebhook(serverId, webhookId);
	}
}
