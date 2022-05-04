import type { ChatMessagePayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSChatMessageCreatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        message: ChatMessagePayload;
    };
    t: WSEvent["ChatMessageCreated"];
}

export interface WSChatMessageUpdatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        message: ChatMessagePayload;
    };
    t: WSEvent["ChatMessageUpdated"];
}

export interface WSChatMessageDeletedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        message: {
            id: string;
            channelId: string;
            serverId: string;
            isPrivate: boolean;
            deletedAt: string;
        };
    };
    t: WSEvent["ChatMessageDeleted"];
}
