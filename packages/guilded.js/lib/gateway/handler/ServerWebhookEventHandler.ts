import type { WSPacket } from "@guildedjs/api";
import { constants } from "../../constants";
import { Webhook } from "../../structures/Webhook";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class ServerWebhookEventHandler extends GatewayEventHandler {
    serverWebhookCreated(data: WSPacket<"ServerWebhookCreated">): boolean {
        const existingWebhook = this.client.webhooks.cache.get(data.d.webhook.id);
        if (existingWebhook) return this.client.emit(constants.clientEvents.WEBHOOK_CREATED, existingWebhook);

        const newWebhook = new Webhook(this.client, data.d.webhook);
        this.client.webhooks.cache.set(newWebhook.id, newWebhook);
        return this.client.emit(constants.clientEvents.WEBHOOK_CREATED, newWebhook);
    }

    serverWebhookUpdated(data: WSPacket<"ServerWebhookUpdated">): boolean {
        const getCachedWebhook = this.client.webhooks.cache.get(data.d.webhook.id);
        if (!getCachedWebhook) {
            const newWebhook = new Webhook(this.client, data.d.webhook);
            return this.client.emit(constants.clientEvents.WEBHOOK_UPDATED, newWebhook, null);
        }

        const frozenOldWebhook = Object.freeze(getCachedWebhook._clone());
        getCachedWebhook._update(data.d.webhook);
        return this.client.emit(constants.clientEvents.WEBHOOK_UPDATED, getCachedWebhook, frozenOldWebhook);
    }
}
