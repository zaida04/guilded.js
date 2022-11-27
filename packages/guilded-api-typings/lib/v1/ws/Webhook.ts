import type { WebhookPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSTeamWebhookCreatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        webhook: WebhookPayload;
    };
    t: WSEvent["ServerWebhookCreated"];
}

export interface WSTeamWebhookUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        webhook: WebhookPayload;
    };
    t: WSEvent["ServerWebhookUpdated"];
}
