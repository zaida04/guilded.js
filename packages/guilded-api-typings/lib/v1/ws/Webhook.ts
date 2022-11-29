import type { WebhookPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSServerWebhookCreatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        webhook: WebhookPayload;
    };
    t: WSEvent["ServerWebhookCreated"];
}

export interface WSServerWebhookUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        webhook: WebhookPayload;
    };
    t: WSEvent["ServerWebhookUpdated"];
}
