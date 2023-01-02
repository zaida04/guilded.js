import type { ServerChannelPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export type WSServerChannelCreated = SkeletonWSPayload & {
    d: {
        channel: ServerChannelPayload;
        serverId: string;
    };
    t: WSEvent["ServerChannelCreated"];
}
export type WSServerChannelUpdated = SkeletonWSPayload & {
    d: {
        channel: ServerChannelPayload;
        serverId: string;
    };
    t: WSEvent["ServerChannelUpdated"];
}
export type WSServerChannelDeleted = SkeletonWSPayload & {
    d: {
        channel: ServerChannelPayload;
        serverId: string;
    };
    t: WSEvent["ServerChannelDeleted"];
}
