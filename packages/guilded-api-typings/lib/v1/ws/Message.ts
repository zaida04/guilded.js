import type { ChatMessagePayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export type WSChatMessageCreatedPayload = SkeletonWSPayload & {
    d: {
        message: ChatMessagePayload;
        serverId: string;
    };
    t: WSEvent["ChatMessageCreated"];
}

export type WSChatMessageUpdatedPayload = SkeletonWSPayload & {
    d: {
        message: ChatMessagePayload;
        serverId: string;
    };
    t: WSEvent["ChatMessageUpdated"];
}

export type WSChatMessageDeletedPayload = SkeletonWSPayload & {
    d: {
        message: {
            channelId: string;
            deletedAt: string;
            id: string;
            isPrivate: boolean;
            serverId: string;
        };
        serverId: string;
    };
    t: WSEvent["ChatMessageDeleted"];
}
