/* istanbul ignore file */
/* eslint-disable */
import type { ForumTopicComment } from "../models/ForumTopicComment";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ForumCommentsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Create a forum topic comment
   * @returns any Success
   * @throws ApiError
   */
  public forumTopicCommentCreate({
    channelId,
    forumTopicId,
    requestBody,
  }: {
    channelId: string;
    forumTopicId: number;
    requestBody: {
      /**
       * The content of the forum topic comment
       */
      content: string;
    };
  }): CancelablePromise<{
    forumTopicComment: ForumTopicComment;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/channels/{channelId}/topics/{forumTopicId}/comments",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Get a forum topic's comments
   * @returns any Success
   * @throws ApiError
   */
  public forumTopicCommentReadMany({
    channelId,
    forumTopicId,
  }: {
    channelId: string;
    forumTopicId: number;
  }): CancelablePromise<{
    forumTopicComments: Array<ForumTopicComment>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/channels/{channelId}/topics/{forumTopicId}/comments",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
      },
    });
  }

  /**
   * Get a comment on a forum topic
   * @returns any Success
   * @throws ApiError
   */
  public forumTopicCommentRead({
    channelId,
    forumTopicId,
    forumTopicCommentId,
  }: {
    channelId: string;
    forumTopicId: number;
    forumTopicCommentId: number;
  }): CancelablePromise<{
    forumTopicComment: ForumTopicComment;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/channels/{channelId}/topics/{forumTopicId}/comments/{forumTopicCommentId}",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
        forumTopicCommentId: forumTopicCommentId,
      },
    });
  }

  /**
   * Update a forum topic comment
   * @returns any Success
   * @throws ApiError
   */
  public forumTopicCommentUpdate({
    channelId,
    forumTopicId,
    forumTopicCommentId,
    requestBody,
  }: {
    channelId: string;
    forumTopicId: number;
    forumTopicCommentId: number;
    requestBody: {
      /**
       * The content of the forum topic
       */
      content?: string;
    };
  }): CancelablePromise<{
    forumTopicComment: ForumTopicComment;
  }> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/channels/{channelId}/topics/{forumTopicId}/comments/{forumTopicCommentId}",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
        forumTopicCommentId: forumTopicCommentId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Delete a forum topic comment
   * @returns void
   * @throws ApiError
   */
  public forumTopicCommentDelete({
    channelId,
    forumTopicId,
    forumTopicCommentId,
  }: {
    channelId: string;
    forumTopicId: number;
    forumTopicCommentId: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/channels/{channelId}/topics/{forumTopicId}/comments/{forumTopicCommentId}",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
        forumTopicCommentId: forumTopicCommentId,
      },
    });
  }
}
