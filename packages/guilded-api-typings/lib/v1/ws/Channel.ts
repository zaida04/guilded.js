import type { ServerChannelPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSServerChannelCreated extends SkeletonWSPayload {
    d: {
        serverId: string;
        channel: ServerChannelPayload;
    };
    t: WSEvent["ServerChannelCreated"];
}
export interface WSServerChannelUpdated extends SkeletonWSPayload {
    d: {
        serverId: string;
        channel: ServerChannelPayload;
    };
    t: WSEvent["ServerChannelUpdated"];
}
export interface WSServerChannelDeleted extends SkeletonWSPayload {
    d: {
        serverId: string;
        channel: ServerChannelPayload;
    };
    t: WSEvent["ServerChannelDeleted"];
}
