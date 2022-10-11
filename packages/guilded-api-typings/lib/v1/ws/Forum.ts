import type { ForumTopicPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export interface WSForumTopicCreated extends SkeletonWSPayload {
    d: {
        serverId: string;
        forumTopic: ForumTopicPayload;
    };
    t: WSEvent["ForumTopicCreated"];
}

export interface WSForumTopicUpdated extends SkeletonWSPayload {
    d: {
        serverId: string;
        forumTopic: ForumTopicPayload;
    };
    t: WSEvent["ForumTopicUpdated"];
}

export interface WSForumTopicDeleted extends SkeletonWSPayload {
    d: {
        serverId: string;
        forumTopic: ForumTopicPayload;
    };
    t: WSEvent["ForumTopicDeleted"];
}

export interface WSForumTopicPinned extends SkeletonWSPayload {
    d: {
        serverId: string;
        forumTopic: ForumTopicPayload;
    };
    t: WSEvent["ForumTopicPinned"];
}

export interface WSForumTopicUnpinned extends SkeletonWSPayload {
    d: {
        serverId: string;
        forumTopic: ForumTopicPayload;
    };
    t: WSEvent["ForumTopicUnpinned"];
}

export interface WSForumTopicLocked extends SkeletonWSPayload {
    d: {
        serverId: string;
        forumTopic: ForumTopicPayload;
    };
    t: WSEvent["ForumTopicLocked"];
}

export interface WSForumTopicUnlocked extends SkeletonWSPayload {
    d: {
        serverId: string;
        forumTopic: ForumTopicPayload;
    };
    t: WSEvent["ForumTopicUnlocked"];
}
