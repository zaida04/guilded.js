import type { ForumTopicPayload } from "../structs/Forum";

/**
 * POST
 * /channels/:channelId/topics
 */
export interface RESTPostForumTopicResult {
    forumTopic: ForumTopicPayload;
}
export interface RESTPostForumTopicBody {
    title: string;
    content: string;
}
