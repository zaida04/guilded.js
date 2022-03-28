import type { ForumThreadPayload } from "../structs/Forum";

/**
 * POST
 * /channels/:channelId/forum
 */
export interface RESTPostForumThreadResult {
    forumThread: ForumThreadPayload;
}
export interface RESTPostForumThreadBody {
    title: string;
    content: string;
}
