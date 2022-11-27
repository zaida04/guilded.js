import type { ServerChannelPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSTeamChannelCreated extends SkeletonWSPayload {
    d: {
        serverId: string;
        channel: ServerChannelPayload;
    };
    t: WSEvent["ServerChannelCreated"];
}
export interface WSTeamChannelUpdated extends SkeletonWSPayload {
    d: {
        serverId: string;
        channel: ServerChannelPayload;
    };
    t: WSEvent["ServerChannelUpdated"];
}
export interface WSTeamChannelDeleted extends SkeletonWSPayload {
    d: {
        serverId: string;
        channel: ServerChannelPayload;
    };
    t: WSEvent["ServerChannelDeleted"];
}
