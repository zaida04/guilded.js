/* istanbul ignore file */

/* eslint-disable */
import type { DocComment } from "../models/DocComment";

import { HttpRequest } from "../core/HttpRequest";

export class DocCommentsService {
  constructor(public readonly httpRequest: HttpRequest) {}

  /**
   * Create a comment on a doc
   * @returns any Success
   * @throws ApiError
   */
  public docCommentCreate({
    channelId,
    docId,
    requestBody,
  }: {
    channelId: string;
    docId: number;
    requestBody: {
      /**
       * The content of the doc comment
       */
      content: string;
    };
  }): Promise<{
    docComment: DocComment;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/channels/{channelId}/docs/{docId}/comments",
      path: {
        channelId: channelId,
        docId: docId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Get a doc's comments
   * @returns any Success
   * @throws ApiError
   */
  public docCommentReadMany({
    channelId,
    docId,
  }: {
    channelId: string;
    docId: number;
  }): Promise<{
    docComments: Array<DocComment>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/channels/{channelId}/docs/{docId}/comments",
      path: {
        channelId: channelId,
        docId: docId,
      },
    });
  }

  /**
   * Get a comment on a doc
   * @returns any Success
   * @throws ApiError
   */
  public docCommentRead({
    channelId,
    docId,
    docCommentId,
  }: {
    channelId: string;
    docId: number;
    docCommentId: number;
  }): Promise<{
    docComment: DocComment;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/channels/{channelId}/docs/{docId}/comments/{docCommentId}",
      path: {
        channelId: channelId,
        docId: docId,
        docCommentId: docCommentId,
      },
    });
  }

  /**
   * Update a doc comment
   * @returns any Success
   * @throws ApiError
   */
  public docCommentUpdate({
    channelId,
    docId,
    docCommentId,
    requestBody,
  }: {
    channelId: string;
    docId: number;
    docCommentId: number;
    requestBody: {
      /**
       * The content of the doc comment
       */
      content: string;
    };
  }): Promise<{
    docComment: DocComment;
  }> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/channels/{channelId}/docs/{docId}/comments/{docCommentId}",
      path: {
        channelId: channelId,
        docId: docId,
        docCommentId: docCommentId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Delete a doc comment
   * @returns void
   * @throws ApiError
   */
  public docCommentDelete({
    channelId,
    docId,
    docCommentId,
  }: {
    channelId: string;
    docId: number;
    docCommentId: number;
  }): Promise<void> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/channels/{channelId}/docs/{docId}/comments/{docCommentId}",
      path: {
        channelId: channelId,
        docId: docId,
        docCommentId: docCommentId,
      },
    });
  }
}
