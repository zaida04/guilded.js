import type { BaseHttpRequest } from "../core/BaseHttpRequest";
/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
export class ReactionsService {
	constructor(public readonly httpRequest: BaseHttpRequest) {}
	/**
	 * Create forum topic reaction
	 * @returns void
	 * @throws ApiError
	 */
	public forumTopicReactionCreate({
		channelId,
		forumTopicId,
		emoteId,
	}: {
		/**
		 * Channel ID where the forum topic exists
		 */
		channelId: string;
		/**
		 * Forum Topic ID
		 */
		forumTopicId: number;
		/**
		 * Emote ID to apply
		 */
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "PUT",
			url: "/channels/{channelId}/topics/{forumTopicId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				forumTopicId: forumTopicId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Delete forum topic reaction
	 * @returns void
	 * @throws ApiError
	 */
	public forumTopicReactionDelete({
		channelId,
		forumTopicId,
		emoteId,
	}: {
		/**
		 * Channel ID where the forum topic exists
		 */
		channelId: string;
		/**
		 * Forum Topic ID
		 */
		forumTopicId: number;
		/**
		 * Emote ID to remove
		 */
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/channels/{channelId}/topics/{forumTopicId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				forumTopicId: forumTopicId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Create forum topic comment reaction
	 * @returns void
	 * @throws ApiError
	 */
	public forumTopicCommentReactionCreate({
		channelId,
		forumTopicId,
		forumTopicCommentId,
		emoteId,
	}: {
		/**
		 * Channel ID where the forum topic exists
		 */
		channelId: string;
		forumTopicId: number;
		forumTopicCommentId: number;
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "PUT",
			url: "/channels/{channelId}/topics/{forumTopicId}/comments/{forumTopicCommentId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				forumTopicId: forumTopicId,
				forumTopicCommentId: forumTopicCommentId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Delete forum topic comment reaction
	 * @returns void
	 * @throws ApiError
	 */
	public forumTopicCommentReactionDelete({
		channelId,
		forumTopicId,
		forumTopicCommentId,
		emoteId,
	}: {
		/**
		 * Channel ID where the forum topic exists
		 */
		channelId: string;
		forumTopicId: number;
		forumTopicCommentId: number;
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/channels/{channelId}/topics/{forumTopicId}/comments/{forumTopicCommentId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				forumTopicId: forumTopicId,
				forumTopicCommentId: forumTopicCommentId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Create calendar event reaction
	 * @returns void
	 * @throws ApiError
	 */
	public calendarEventReactionCreate({
		channelId,
		calendarEventId,
		emoteId,
	}: {
		channelId: string;
		calendarEventId: number;
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "PUT",
			url: "/channels/{channelId}/events/{calendarEventId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				calendarEventId: calendarEventId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Delete calendar event reaction
	 * @returns void
	 * @throws ApiError
	 */
	public calendarEventReactionDelete({
		channelId,
		calendarEventId,
		emoteId,
	}: {
		channelId: string;
		calendarEventId: number;
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/channels/{channelId}/events/{calendarEventId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				calendarEventId: calendarEventId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Create calendar event comment reaction
	 * @returns void
	 * @throws ApiError
	 */
	public calendarEventCommentReactionCreate({
		channelId,
		calendarEventId,
		calendarEventCommentId,
		emoteId,
	}: {
		channelId: string;
		calendarEventId: number;
		calendarEventCommentId: number;
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "PUT",
			url: "/channels/{channelId}/events/{calendarEventId}/comments/{calendarEventCommentId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				calendarEventId: calendarEventId,
				calendarEventCommentId: calendarEventCommentId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Delete calendar event comment reaction
	 * @returns void
	 * @throws ApiError
	 */
	public calendarEventCommentReactionDelete({
		channelId,
		calendarEventId,
		calendarEventCommentId,
		emoteId,
	}: {
		channelId: string;
		calendarEventId: number;
		calendarEventCommentId: number;
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/channels/{channelId}/events/{calendarEventId}/comments/{calendarEventCommentId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				calendarEventId: calendarEventId,
				calendarEventCommentId: calendarEventCommentId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Create doc reaction
	 * @returns void
	 * @throws ApiError
	 */
	public docReactionCreate({
		channelId,
		docId,
		emoteId,
	}: {
		channelId: string;
		docId: number;
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "PUT",
			url: "/channels/{channelId}/docs/{docId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				docId: docId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Delete doc reaction
	 * @returns void
	 * @throws ApiError
	 */
	public docReactionDelete({
		channelId,
		docId,
		emoteId,
	}: {
		channelId: string;
		docId: number;
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/channels/{channelId}/docs/{docId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				docId: docId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Create doc comment reaction
	 * @returns void
	 * @throws ApiError
	 */
	public docCommentReactionCreate({
		channelId,
		docId,
		docCommentId,
		emoteId,
	}: {
		channelId: string;
		docId: number;
		docCommentId: number;
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "PUT",
			url: "/channels/{channelId}/docs/{docId}/comments/{docCommentId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				docId: docId,
				docCommentId: docCommentId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Delete doc comment reaction
	 * @returns void
	 * @throws ApiError
	 */
	public docCommentReactionDelete({
		channelId,
		docId,
		docCommentId,
		emoteId,
	}: {
		channelId: string;
		docId: number;
		docCommentId: number;
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/channels/{channelId}/docs/{docId}/comments/{docCommentId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				docId: docId,
				docCommentId: docCommentId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Create announcement reaction
	 * @returns void
	 * @throws ApiError
	 */
	public announcementReactionCreate({
		channelId,
		announcementId,
		emoteId,
	}: {
		channelId: string;
		announcementId: string;
		/**
		 * Emote ID to apply
		 */
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "PUT",
			url: "/channels/{channelId}/announcements/{announcementId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				announcementId: announcementId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Delete announcement reaction
	 * @returns void
	 * @throws ApiError
	 */
	public announcementReactionDelete({
		channelId,
		announcementId,
		emoteId,
	}: {
		channelId: string;
		announcementId: string;
		/**
		 * Emote ID to apply
		 */
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/channels/{channelId}/announcements/{announcementId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				announcementId: announcementId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Create an announcement comment reaction
	 * @returns void
	 * @throws ApiError
	 */
	public announcementCommentReactionCreate({
		channelId,
		announcementId,
		announcementCommentId,
		emoteId,
	}: {
		/**
		 * Channel ID where the announcement comment exists
		 */
		channelId: string;
		announcementId: string;
		announcementCommentId: number;
		/**
		 * Emote ID to apply
		 */
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "PUT",
			url: "/channels/{channelId}/announcements/{announcementId}/comments/{announcementCommentId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				announcementId: announcementId,
				announcementCommentId: announcementCommentId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Delete an announcement comment reaction
	 * @returns void
	 * @throws ApiError
	 */
	public announcementCommentReactionDelete({
		channelId,
		announcementId,
		announcementCommentId,
		emoteId,
	}: {
		/**
		 * Channel ID where the announcement comment exists
		 */
		channelId: string;
		announcementId: string;
		announcementCommentId: number;
		/**
		 * Emote ID to apply
		 */
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/channels/{channelId}/announcements/{announcementId}/comments/{announcementCommentId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				announcementId: announcementId,
				announcementCommentId: announcementCommentId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Create a message reaction
	 * @returns void
	 * @throws ApiError
	 */
	public channelMessageReactionCreate({
		channelId,
		messageId,
		emoteId,
	}: {
		channelId: string;
		messageId: string;
		emoteId: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "PUT",
			url: "/channels/{channelId}/messages/{messageId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				messageId: messageId,
				emoteId: emoteId,
			},
		});
	}
	/**
	 * Delete a message reaction
	 * @returns void
	 * @throws ApiError
	 */
	public channelMessageReactionDelete({
		channelId,
		messageId,
		emoteId,
		userId,
	}: {
		channelId: string;
		messageId: string;
		emoteId: number;
		userId?: string | "@me";
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/channels/{channelId}/messages/{messageId}/emotes/{emoteId}",
			path: {
				channelId: channelId,
				messageId: messageId,
				emoteId: emoteId,
			},
			query: {
				userId: userId,
			},
		});
	}
	/**
	 * Bulk delete a message's reactions
	 * @returns void
	 * @throws ApiError
	 */
	public channelMessageReactionDeleteMany({
		channelId,
		messageId,
		emoteId,
	}: {
		channelId: string;
		messageId: string;
		emoteId?: number;
	}): CancelablePromise<void> {
		return this.httpRequest.request({
			method: "DELETE",
			url: "/channels/{channelId}/messages/{messageId}/emotes",
			path: {
				channelId: channelId,
				messageId: messageId,
			},
			query: {
				emoteId: emoteId,
			},
		});
	}
}
