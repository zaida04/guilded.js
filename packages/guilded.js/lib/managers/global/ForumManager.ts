import { Collection } from "@discordjs/collection";
import type { ForumsService } from "@guildedjs/api";
import { ForumTopic, PartialForumTopic } from "../../structures/Forum";
import type { OptionBody, OptionQuery } from "../../typings";
import { CacheableStructManager } from "./CacheableStructManager";

/**
 * Manager for interacting with forum topics at a global level.
 */
export class GlobalForumTopicManager extends CacheableStructManager<number, ForumTopic> {
	get shouldCacheForumTopic(): boolean {
		return this.client.options.cache?.cacheForumTopics !== false;
	}

	/**
	 * Create a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param options The options for creating the forum topic.
	 * @returns A Promise that resolves with the payload of the created forum topic.
	 */
	async create(channelId: string, options: OptionBody<ForumsService["forumTopicCreate"]>): Promise<ForumTopic> {
		const data = await this.client.rest.router.forums.forumTopicCreate({
			channelId,
			requestBody: options,
		});
		return new ForumTopic(this.client, data.forumTopic);
	}

	/**
	 * Get all topics in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param options The options for filtering the forum topics.
	 * @returns A Promise that resolves to a Collection of ForumTopics.
	 */
	async fetchMany(channelId: string, options: Omit<OptionQuery<ForumsService["forumTopicReadMany"]>, "channelId">): Promise<Collection<number, PartialForumTopic>> {
		const data = await this.client.rest.router.forums.forumTopicReadMany({
			channelId,
			...options,
		});

		const topics = new Collection<number, PartialForumTopic>();
		for (const forumTopic of data.forumTopics) {
			const newTopic = new PartialForumTopic(this.client, forumTopic);
			topics.set(newTopic.id, newTopic);
		}

		return topics;
	}

	/**
	 * Get a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumTopicId The ID of the forum topic.
	 * @returns a Promise that resolves to a ForumTopic.
	 */
	async fetch(channelId: string, forumTopicId: number): Promise<ForumTopic> {
		const data = await this.client.rest.router.forums.forumTopicRead({
			channelId,
			forumTopicId,
		});
		return new ForumTopic(this.client, data.forumTopic);
	}

	/**
	 * Update a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumTopicId The ID of the forum topic.
	 * @param options The options for updating the forum topic.
	 * @returns A Promise that resolves to the updated ForumTopic. If cached locally, it will modify that object.
	 */
	async update(channelId: string, forumTopicId: number, options: OptionBody<ForumsService["forumTopicUpdate"]>): Promise<ForumTopic> {
		const data = await this.client.rest.router.forums.forumTopicUpdate({
			channelId,
			forumTopicId,
			requestBody: options,
		});

		const existingTopic = this.client.topics.cache.get(data.forumTopic.id);
		if (existingTopic) return existingTopic._update(data.forumTopic);

		const newTopic = new ForumTopic(this.client, data.forumTopic);
		this.client.topics.cache.set(newTopic.id, newTopic);
		return newTopic;
	}

	/**
	 * Delete a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumTopicId The ID of the forum topic.
	 * @returns A Promise that resolves to nothing.
	 */
	async delete(channelId: string, forumTopicId: number): Promise<void> {
		await this.client.rest.router.forums.forumTopicDelete({
			channelId,
			forumTopicId,
		});
	}

	/**
	 * Pin a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumTopicId The ID of the forum topic.
	 * @returns A Promise that resolves to nothing.
	 */
	async pin(channelId: string, forumTopicId: number): Promise<void> {
		await this.client.rest.router.forums.forumTopicPin({
			channelId,
			forumTopicId,
		});
	}

	/**
	 * Unpin a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumTopicId The ID of the forum topic.
	 * @returns A Promise that resolves to nothing.
	 */
	async unpin(channelId: string, forumTopicId: number): Promise<void> {
		await this.client.rest.router.forums.forumTopicUnpin({
			channelId,
			forumTopicId,
		});
	}

	/**
	 * Lock a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumTopicId The ID of the forum topic.
	 * @returns A Promise that resolves to nothing.
	 */
	async lock(channelId: string, forumTopicId: number): Promise<void> {
		await this.client.rest.router.forums.forumTopicLock({
			channelId,
			forumTopicId,
		});
	}

	/**
	 * Unlock a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumTopicId The ID
	 * @returns A Promise that resolves to nothing.
	 */
	async unlock(channelId: string, forumTopicId: number): Promise<void> {
		await this.client.rest.router.forums.forumTopicUnlock({
			channelId,
			forumTopicId,
		});
	}
}
