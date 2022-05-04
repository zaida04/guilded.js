import type { ServerChannelPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSTeamChannelCreated extends SkeletonWSPayload {
    d: {
        serverId: string;
        channel: ServerChannelPayload;
    };
    t: WSEvent["TeamChannelCreated"];
}
export interface WSTeamChannelUpdated extends SkeletonWSPayload {
    d: {
        serverId: string;
        channel: ServerChannelPayload;
    };
    t: WSEvent["TeamChannelUpdated"];
}
export interface WSTeamChannelDeleted extends SkeletonWSPayload {
    d: {
        serverId: string;
        channel: ServerChannelPayload;
    };
    t: WSEvent["TeamChannelDeleted"];
}
