/* istanbul ignore file */
/* eslint-disable */
import type { ForumTopic } from "../models/ForumTopic";
import type { ForumTopicSummary } from "../models/ForumTopicSummary";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ForumsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Create a topic in a forum
   * @returns any Success
   * @throws ApiError
   */
  public forumTopicCreate({
    channelId,
    requestBody,
  }: {
    channelId: string;
    requestBody: {
      /**
       * The title of the forum topic
       */
      title: string;
      /**
       * The content of the forum topic
       */
      content: Record<string, any> | string;
    };
  }): CancelablePromise<{
    forumTopic: ForumTopic;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/channels/{channelId}/topics",
      path: {
        channelId: channelId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Get forum topics
   * @returns any Success
   * @throws ApiError
   */
  public forumTopicReadMany({
    channelId,
    before,
    limit = 25,
  }: {
    channelId: string;
    before?: string;
    limit?: number;
  }): CancelablePromise<{
    forumTopics: Array<ForumTopicSummary>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/channels/{channelId}/topics",
      path: {
        channelId: channelId,
      },
      query: {
        before: before,
        limit: limit,
      },
    });
  }

  /**
   * Get a forum topic
   * @returns any Success
   * @throws ApiError
   */
  public forumTopicRead({
    channelId,
    forumTopicId,
  }: {
    channelId: string;
    forumTopicId: number;
  }): CancelablePromise<{
    forumTopic: ForumTopic;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/channels/{channelId}/topics/{forumTopicId}",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
      },
    });
  }

  /**
   * Update a forum topic
   * @returns any Success
   * @throws ApiError
   */
  public forumTopicUpdate({
    channelId,
    forumTopicId,
    requestBody,
  }: {
    channelId: string;
    forumTopicId: number;
    requestBody: {
      /**
       * The title of the forum topic
       */
      title?: string;
      /**
       * The content of the forum topic
       */
      content?: string;
    };
  }): CancelablePromise<{
    forumTopic: ForumTopic;
  }> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/channels/{channelId}/topics/{forumTopicId}",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Delete a forum topic
   * @returns void
   * @throws ApiError
   */
  public forumTopicDelete({
    channelId,
    forumTopicId,
  }: {
    channelId: string;
    forumTopicId: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/channels/{channelId}/topics/{forumTopicId}",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
      },
    });
  }

  /**
   * Pin a forum topic
   * @returns void
   * @throws ApiError
   */
  public forumTopicPin({
    channelId,
    forumTopicId,
  }: {
    channelId: string;
    forumTopicId: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/channels/{channelId}/topics/{forumTopicId}/pin",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
      },
    });
  }

  /**
   * Unpin a forum topic
   * @returns void
   * @throws ApiError
   */
  public forumTopicUnpin({
    channelId,
    forumTopicId,
  }: {
    channelId: string;
    forumTopicId: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/channels/{channelId}/topics/{forumTopicId}/pin",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
      },
    });
  }

  /**
   * Lock a forum topic
   * @returns void
   * @throws ApiError
   */
  public forumTopicLock({
    channelId,
    forumTopicId,
  }: {
    channelId: string;
    forumTopicId: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/channels/{channelId}/topics/{forumTopicId}/lock",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
      },
    });
  }

  /**
   * Unlock a forum topic
   * @returns void
   * @throws ApiError
   */
  public forumTopicUnlock({
    channelId,
    forumTopicId,
  }: {
    channelId: string;
    forumTopicId: number;
  }): CancelablePromise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/channels/{channelId}/topics/{forumTopicId}/lock",
      path: {
        channelId: channelId,
        forumTopicId: forumTopicId,
      },
    });
  }
}
