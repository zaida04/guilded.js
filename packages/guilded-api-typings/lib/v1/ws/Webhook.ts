import type { WebhookPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export type WSServerWebhookCreatedPayload = SkeletonWSPayload & {
    d: {
        serverId: string;
        webhook: WebhookPayload;
    };
    t: WSEvent["ServerWebhookCreated"];
}

export type WSServerWebhookUpdatedPayload = SkeletonWSPayload & {
    d: {
        serverId: string;
        webhook: WebhookPayload;
    };
    t: WSEvent["ServerWebhookUpdated"];
}
