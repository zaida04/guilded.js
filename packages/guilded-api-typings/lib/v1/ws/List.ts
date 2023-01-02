import type { ListItemPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export type WSListItemCreated = SkeletonWSPayload & {
    d: {
        listItem: ListItemPayload;
        serverId: string;
    };
    t: WSEvent["ListItemCreated"];
}
export type WSListItemUpdated = SkeletonWSPayload & {
    d: {
        listItem: ListItemPayload;
        serverId: string;
    };
    t: WSEvent["ListItemUpdated"];
}
export type WSListItemDeleted = SkeletonWSPayload & {
    d: {
        listItem: ListItemPayload;
        serverId: string;
    };
    t: WSEvent["ListItemDeleted"];
}

export type WSListItemCompleted = SkeletonWSPayload & {
    d: {
        listItem: ListItemPayload;
        serverId: string;
    };
    t: WSEvent["ListItemCompleted"];
}

export type WSListItemUncompleted = SkeletonWSPayload & {
    d: {
        listItem: ListItemPayload;
        serverId: string;
    };
    t: WSEvent["ListItemUncompleted"];
}
