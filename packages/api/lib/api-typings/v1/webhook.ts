import type { APIEmbed } from "./structs/Embed";
import type { WebhookContentPayload } from "./structs/Webhook";

/**
 * POST
 * /webhooks/:webhookId/:webhookToken
 */
export type RESTPostWebhookBody = {
  avatar_url?: string;
  content?: string;
  embeds?: APIEmbed[];
  payload_json?: Pick<
    RESTPostWebhookBody,
    "avatar_url" | "content" | "embeds" | "username"
  >;
  username?: string;
};

export type RESTPostWebhookResult = WebhookContentPayload;
