import type { DocPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export type WSDocCreated = SkeletonWSPayload & {
    d: {
        doc: DocPayload;
        serverId: string;
    };
    t: WSEvent["DocCreated"];
}
export type WSDocUpdated = SkeletonWSPayload & {
    d: {
        doc: DocPayload;
        serverId: string;
    };
    t: WSEvent["DocUpdated"];
}
export type WSDocDeleted = SkeletonWSPayload & {
    d: {
        doc: DocPayload;
        serverId: string;
    };
    t: WSEvent["DocDeleted"];
}
