import type { ForumTopicPayload, ForumTopicSummaryPayload } from "../structs/Forum";

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

/**
 * PUT
 * /channels/:channelId/topics/:forumTopicId/pin
 */
export type RESTPutForumTopicPinResult = never;

/**
 * DELETE
 * /channels/:channelId/topics/:forumTopicId/pin
 */
export type RESTDeleteForumTopicPinResult = never;

/**
 * POST
 * /channels/:channelId/topics
 */
export interface RESTPostForumTopicsBody {
    title: string;
    content: string;
}
export interface RESTPostForumTopicsResult {
    forumTopic: ForumTopicPayload;
}

/**
 * GET
 * /channels/:channelId/topics
 */
export interface RESTGetForumTopicsQuery {
    before?: string;
    limit?: number;
}
export interface RESTGetForumTopicsResult {
    forumTopics: ForumTopicSummaryPayload[];
}

/**
 * GET
 * /channels/:channelId/topics/:forumTopicId
 */
export interface RESTGetForumTopicResult {
    forumTopic: ForumTopicPayload;
}

/**
 * PATCH
 * /channels/:channelId/topics/:forumTopicId
 */
export interface RESTPatchForumTopicBody {
    title: string;
    content: string;
}
export interface RESTPatchForumTopicResult {
    forumTopic: ForumTopicPayload;
}

/**
 * DELETE
 * /channels/:channelId/topics/:forumTopicId
 */
export type RESTDeleteForumTopicResult = never;
