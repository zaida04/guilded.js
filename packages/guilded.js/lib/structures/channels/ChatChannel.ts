import type { RESTPostServerWebhooksBody } from "@guildedjs/guilded-api-typings";
import type { Webhook } from "../Webhook";
import { Channel } from "./Channel";

export class ChatChannel extends Channel {
	/** Create a webhook */
	createWebhook(options: RESTPostServerWebhooksBody): Promise<Webhook> {
		return this.client.webhooks.create(this.serverId, options);
	}
}
