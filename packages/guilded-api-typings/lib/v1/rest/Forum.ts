import type { ForumTopicPayload, ForumTopicSummaryPayload } from "../structs/Forum";

/**
 * POST
 * /channels/:channelId/topics
 */
export type RESTPostForumTopicResult = {
    forumTopic: ForumTopicPayload;
}
export type RESTPostForumTopicBody = {
    content: string;
    title: string;
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
 * PUT
 * /channels/:channelId/topics/:forumTopicId/lock
 */
export type RESTPutForumTopicLockResult = never;

/**
 * DELETE
 * /channels/:channelId/topics/:forumTopicId/lock
 */
export type RESTDeleteForumTopicLockResult = never;

/**
 * POST
 * /channels/:channelId/topics
 */
export type RESTPostForumTopicsBody = {
    content: string;
    title: string;
}
export type RESTPostForumTopicsResult = {
    forumTopic: ForumTopicPayload;
}

/**
 * GET
 * /channels/:channelId/topics
 */
export type RESTGetForumTopicsQuery = {
    before?: string;
    limit?: number;
}
export type RESTGetForumTopicsResult = {
    forumTopics: ForumTopicSummaryPayload[];
}

/**
 * GET
 * /channels/:channelId/topics/:forumTopicId
 */
export type RESTGetForumTopicResult = {
    forumTopic: ForumTopicPayload;
}

/**
 * PATCH
 * /channels/:channelId/topics/:forumTopicId
 */
export type RESTPatchForumTopicBody = {
    content: string;
    title: string;
}
export type RESTPatchForumTopicResult = {
    forumTopic: ForumTopicPayload;
}

/**
 * DELETE
 * /channels/:channelId/topics/:forumTopicId
 */
export type RESTDeleteForumTopicResult = never;
