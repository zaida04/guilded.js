import type { ForumTopicPayload } from "../structs/Forum";

/**
 * POST
 * /channels/:channelId/forum
 */
export interface RESTPostForumTopicResult {
    forumTopic: ForumTopicPayload;
}
export interface RESTPostForumTopicBody {
    title: string;
    content: string;
}
