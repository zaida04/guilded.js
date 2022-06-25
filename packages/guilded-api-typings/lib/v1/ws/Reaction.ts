import type { EmotePayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSChannelMessageReactionCreatedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        reaction: {
            channelId: string;
            messageId: string;
            createdBy: string;
            emote: EmotePayload;
        };
    };
    t: WSEvent["ChannelMessageReactionCreated"];
}

export interface WSChannelMessageReactionDeletedPayload extends SkeletonWSPayload {
    d: {
        serverId: string;
        reaction: {
            channelId: string;
            messageId: string;
            createdBy: string;
            emote: EmotePayload;
        };
    };
    t: WSEvent["ChannelMessageReactionDeleted"];
}
