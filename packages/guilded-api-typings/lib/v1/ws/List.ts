import type { ListItemPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSListItemCreated extends SkeletonWSPayload {
    d: {
        serverId: string;
        listItem: ListItemPayload;
    };
    t: WSEvent["ListItemCreated"];
}
export interface WSListItemUpdated extends SkeletonWSPayload {
    d: {
        serverId: string;
        listItem: ListItemPayload;
    };
    t: WSEvent["ListItemUpdated"];
}
export interface WSListItemDeleted extends SkeletonWSPayload {
    d: {
        serverId: string;
        listItem: ListItemPayload;
    };
    t: WSEvent["ListItemDeleted"];
}

export interface WSListItemCompleted extends SkeletonWSPayload {
    d: {
        serverId: string;
        listItem: ListItemPayload;
    };
    t: WSEvent["ListItemCompleted"];
}

export interface WSListItemUncompleted extends SkeletonWSPayload {
    d: {
        serverId: string;
        listItem: ListItemPayload;
    };
    t: WSEvent["ListItemUncompleted"];
}
