import type { EmotePayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export type WSChannelMessageReactionCreatedPayload = SkeletonWSPayload & {
    d: {
        reaction: {
            channelId: string;
            createdBy: string;
            emote: EmotePayload;
            messageId: string;
        };
        serverId: string;
    };
    t: WSEvent["ChannelMessageReactionCreated"];
}

export type WSChannelMessageReactionDeletedPayload = SkeletonWSPayload & {
    d: {
        reaction: {
            channelId: string;
            createdBy: string;
            emote: EmotePayload;
            messageId: string;
        };
        serverId: string;
    };
    t: WSEvent["ChannelMessageReactionDeleted"];
}
