import type { APIEmbed } from "../structs/Embed";
import type { WebhookContentPayload, WebhookPayload } from "../structs/Webhook";

/**
 * POST
 * /servers/:serverId/webhooks
 */
export type RESTPostServerWebhooksResult = {
    webhook: WebhookPayload;
}
export type RESTPostServerWebhooksBody = {
    channelId: string;
    name: string;
}

/**
 * GET
 * /servers/:serverId/webhooks
 */
export type RESTGetServerWebhooksResult = {
    webhooks: WebhookPayload[];
}
export type RESTGetServerWebhooksQuery = {
    channelId: string;
}

/**
 * GET
 * /servers/:serverId/webhooks/:webhookId
 */
export type RESTGetServerWebhookResult = {
    webhook: WebhookPayload;
}

/**
 * PUT
 * /servers/:serverId/webhooks/:webhookId
 */
export type RESTPutServerWebhookResult = {
    webhook: WebhookPayload;
}
export type RESTPutServerWebhookBody = {
    channelId?: string;
    name: string;
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
export type RESTPostWebhookBody = {
    avatar_url?: string;
    content?: string;
    embeds?: APIEmbed[];
    payload_json?: Pick<RESTPostWebhookBody, "avatar_url" | "content" | "embeds" | "username">;
    username?: string;
}

export type RESTPostWebhookResult = WebhookContentPayload;
