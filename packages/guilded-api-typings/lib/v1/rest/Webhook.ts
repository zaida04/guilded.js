import type { APIEmbed } from "../structs/Embed";
import type { WebhookContentPayload, WebhookPayload } from "../structs/Webhook";

/**
 * POST
 * /servers/:serverId/webhooks
 */
export interface RESTPostServerWebhooksResult {
    webhook: WebhookPayload;
}
export interface RESTPostServerWebhooksBody {
    name: string;
    channelId: string;
}

/**
 * GET
 * /servers/:serverId/webhooks
 */
export interface RESTGetServerWebhooksResult {
    webhooks: WebhookPayload[];
}
export interface RESTGetServerWebhooksQuery {
    channelId: string;
}

/**
 * GET
 * /servers/:serverId/webhooks/:webhookId
 */
export interface RESTGetServerWebhookResult {
    webhook: WebhookPayload;
}

/**
 * PUT
 * /servers/:serverId/webhooks/:webhookId
 */
export interface RESTPutServerWebhookResult {
    webhook: WebhookPayload;
}
export interface RESTPutServerWebhookBody {
    name: string;
    channelId?: string;
}

/**
 * DELETE
 * /servers/:serverId/webhooks/:webhookId
 */
export type RESTDeleteServerWebhookResult = never;

/**
 * POST
 * /webhooks/:webhookId/:webhookToken
 */
export interface RESTPostWebhookBody {
    content: string;
    embeds: APIEmbed[];
}

export type RESTPostWebhookResult = WebhookContentPayload;
