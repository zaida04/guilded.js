import type { DocPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSDocCreated extends SkeletonWSPayload {
    d: {
        serverId: string;
        doc: DocPayload;
    };
    t: WSEvent["DocCreated"];
}
export interface WSDocUpdated extends SkeletonWSPayload {
    d: {
        serverId: string;
        doc: DocPayload;
    };
    t: WSEvent["DocUpdated"];
}
export interface WSDocDeleted extends SkeletonWSPayload {
    d: {
        serverId: string;
        doc: DocPayload;
    };
    t: WSEvent["DocDeleted"];
}
