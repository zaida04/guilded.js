import { RestBody, RestPath } from "@guildedjs/api";
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
	createWebhook(
		options: RestBody<RestPath<"/servers/{serverId}/webhooks">["post"]>
	): Promise<Webhook> {
		return this.client.webhooks.create(this.serverId, options);
	}
}
