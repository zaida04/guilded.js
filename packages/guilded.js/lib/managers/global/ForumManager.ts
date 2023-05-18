import { RestBody, RestPath, RestQuery } from "@guildedjs/api";
import { ForumTopic, PartialForumTopic } from "../../structures/Forum";
import { CacheableStructManager } from "./CacheableStructManager";
import { Collection } from "@discordjs/collection";

/**
 * Manager for interacting with forum topics at a global level.
 */
export class GlobalForumTopicManager extends CacheableStructManager<
	number,
	ForumTopic
> {
	get shouldCacheForumTopic() {
		return this.client.options.cache?.cacheForumTopics !== false;
	}

	/**
	 * Create a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param options The options for creating the forum topic.
	 * @returns A Promise that resolves with the payload of the created forum topic.
	 */
	create(
		channelId: string,
		options: RestBody<RestPath<"/channels/{channelId}/topics">["post"]>
	): Promise<ForumTopic> {
		return this.client.rest.router
			.createForumTopic(channelId, options)
			.then((data) => new ForumTopic(this.client, data.forumTopic));
	}

	/**
	 * Get all topics in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param options The options for filtering the forum topics.
	 * @returns A Promise that resolves to a Collection of ForumTopics.
	 */
	fetchMany(
		channelId: string,
		options: RestQuery<RestPath<"/channels/{channelId}/topics">["get"]>
	): Promise<Collection<number, PartialForumTopic>> {
		return this.client.rest.router
			.getForumTopics(channelId, options)
			.then((data) => {
				const topics = new Collection<number, PartialForumTopic>();
				for (const forumTopic of data.forumTopics) {
					const newTopic = new PartialForumTopic(this.client, forumTopic);
					topics.set(newTopic.id, newTopic);
				}
				return topics;
			});
	}

	/**
	 * Get a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumThreadId The ID of the forum topic.
	 * @returns a Promise that resolves to a ForumTopic.
	 */
	fetch(channelId: string, forumTopicId: number): Promise<ForumTopic> {
		return this.client.rest.router
			.getForumTopic(channelId, forumTopicId.toString())
			.then((data) => new ForumTopic(this.client, data.forumTopic));
	}

	/**
	 * Update a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumThreadId The ID of the forum topic.
	 * @param options The options for updating the forum topic.
	 * @returns A Promise that resolves to the updated ForumTopic. If cached locally, it will modify that object.
	 */
	update(
		channelId: string,
		forumThreadId: string,
		options: RestBody<
			RestPath<"/channels/{channelId}/topics/{forumTopicId}">["patch"]
		>
	): Promise<ForumTopic> {
		return this.client.rest.router
			.updateForumTopic(channelId, forumThreadId, options)
			.then((data) => {
				// This is in the case of which the WS gateway beats us to modifying the topic in the cache. If they haven't, then we do it ourselves.
				const existingTopic = this.client.topics.cache.get(data.forumTopic.id);
				if (existingTopic) return existingTopic._update(data.forumTopic);

				const newTopic = new ForumTopic(this.client, data.forumTopic);
				this.client.topics.cache.set(newTopic.id, newTopic);
				return newTopic;
			});
	}

	/**
	 * Delete a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumThreadId The ID of the forum topic.
	 * @returns A Promise that resolves to nothing.
	 */
	delete(channelId: string, forumThreadId: string): Promise<void> {
		return this.client.rest.router
			.deleteForumTopic(channelId, forumThreadId)
			.then(() => void 0);
	}

	/**
	 * Pin a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumThreadId The ID of the forum topic.
	 * @returns A Promise that resolves to nothing.
	 */
	pin(channelId: string, forumThreadId: string): Promise<void> {
		return this.client.rest.router
			.pinForumTopic(channelId, forumThreadId)
			.then(() => void 0);
	}

	/**
	 * Unpin a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumThreadId The ID of the forum topic.
	 * @returns A Promise that resolves to nothing.
	 */
	unpin(channelId: string, forumThreadId: string): Promise<void> {
		return this.client.rest.router
			.unpinForumTopic(channelId, forumThreadId)
			.then(() => void 0);
	}

	/**
	 * Lock a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumThreadId The ID of the forum topic.
	 * @returns A Promise that resolves to nothing.
	 */
	lock(channelId: string, forumThreadId: string): Promise<void> {
		return this.client.rest.router
			.lockForumTopic(channelId, forumThreadId)
			.then(() => void 0);
	}

	/**
	 * Unlock a topic in a forum.
	 *
	 * @param channelId The ID of the channel containing the forum.
	 * @param forumThreadId The ID
	 * @returns A Promise that resolves to nothing.
	 */
	unlock(channelId: string, forumThreadId: string): Promise<void> {
		return this.client.rest.router
			.unlockForumTopic(channelId, forumThreadId)
			.then(() => void 0);
	}
}
