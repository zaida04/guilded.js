import type { ForumTopicPayload } from "../structs";
import type { SkeletonWSPayload, WSEvent } from "./Events";

export type WSForumTopicCreated = SkeletonWSPayload & {
    d: {
        forumTopic: ForumTopicPayload;
        serverId: string;
    };
    t: WSEvent["ForumTopicCreated"];
}

export type WSForumTopicUpdated = SkeletonWSPayload & {
    d: {
        forumTopic: ForumTopicPayload;
        serverId: string;
    };
    t: WSEvent["ForumTopicUpdated"];
}

export type WSForumTopicDeleted = SkeletonWSPayload & {
    d: {
        forumTopic: ForumTopicPayload;
        serverId: string;
    };
    t: WSEvent["ForumTopicDeleted"];
}

export type WSForumTopicPinned = SkeletonWSPayload & {
    d: {
        forumTopic: ForumTopicPayload;
        serverId: string;
    };
    t: WSEvent["ForumTopicPinned"];
}

export type WSForumTopicUnpinned = SkeletonWSPayload & {
    d: {
        forumTopic: ForumTopicPayload;
        serverId: string;
    };
    t: WSEvent["ForumTopicUnpinned"];
}

export type WSForumTopicLocked = SkeletonWSPayload & {
    d: {
        forumTopic: ForumTopicPayload;
        serverId: string;
    };
    t: WSEvent["ForumTopicLocked"];
}

export type WSForumTopicUnlocked = SkeletonWSPayload & {
    d: {
        forumTopic: ForumTopicPayload;
        serverId: string;
    };
    t: WSEvent["ForumTopicUnlocked"];
}
