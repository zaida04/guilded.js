/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ForumTopicComment } from '../models/ForumTopicComment';

import { HttpRequest } from "../core/HttpRequest";

export class ForumCommentsService {

	constructor(public readonly httpRequest: HttpRequest) { }

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
		channelId: string,
		forumTopicId: number,
		requestBody: {
			/**
			 * The content of the forum topic comment
			 */
			content: string;
		},
	}): Promise<{
		forumTopicComment: ForumTopicComment;
	}> {
		return this.httpRequest.request({
			method: 'POST',
			url: '/channels/{channelId}/topics/{forumTopicId}/comments',
			path: {
				'channelId': channelId,
				'forumTopicId': forumTopicId,
			},
			body: requestBody,
			mediaType: 'application/json',
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
		channelId: string,
		forumTopicId: number,
	}): Promise<{
		forumTopicComments: Array<ForumTopicComment>;
	}> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/channels/{channelId}/topics/{forumTopicId}/comments',
			path: {
				'channelId': channelId,
				'forumTopicId': forumTopicId,
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
		channelId: string,
		forumTopicId: number,
		forumTopicCommentId: number,
	}): Promise<{
		forumTopicComment: ForumTopicComment;
	}> {
		return this.httpRequest.request({
			method: 'GET',
			url: '/channels/{channelId}/topics/{forumTopicId}/comments/{forumTopicCommentId}',
			path: {
				'channelId': channelId,
				'forumTopicId': forumTopicId,
				'forumTopicCommentId': forumTopicCommentId,
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
		channelId: string,
		forumTopicId: number,
		forumTopicCommentId: number,
		requestBody: {
			/**
			 * The content of the forum topic
			 */
			content?: string;
		},
	}): Promise<{
		forumTopicComment: ForumTopicComment;
	}> {
		return this.httpRequest.request({
			method: 'PATCH',
			url: '/channels/{channelId}/topics/{forumTopicId}/comments/{forumTopicCommentId}',
			path: {
				'channelId': channelId,
				'forumTopicId': forumTopicId,
				'forumTopicCommentId': forumTopicCommentId,
			},
			body: requestBody,
			mediaType: 'application/json',
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
		channelId: string,
		forumTopicId: number,
		forumTopicCommentId: number,
	}): Promise<void> {
		return this.httpRequest.request({
			method: 'DELETE',
			url: '/channels/{channelId}/topics/{forumTopicId}/comments/{forumTopicCommentId}',
			path: {
				'channelId': channelId,
				'forumTopicId': forumTopicId,
				'forumTopicCommentId': forumTopicCommentId,
			},
		});
	}

}
