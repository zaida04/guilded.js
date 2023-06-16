import { Collection } from "@discordjs/collection";
import type { ForumsService } from "@guildedjs/api";
import { ForumTopic, PartialForumTopic } from "../../structures/Forum";
import type { OptionBody, OptionQuery } from "../../typings";
import { CacheableStructManager } from "./CacheableStructManager";

/**
 * Manager for interacting with forum topics at a global level.
 */
export class GlobalForumTopicManager extends CacheableStructManager<number, ForumTopic> {
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
    create(channelId: string, options: OptionBody<ForumsService["forumTopicCreate"]>): Promise<ForumTopic> {
        return this.client.rest.router.forums.forumTopicCreate({ channelId, requestBody: options }).then((data) => new ForumTopic(this.client, data.forumTopic));
    }

    /**
     * Get all topics in a forum.
     *
     * @param channelId The ID of the channel containing the forum.
     * @param options The options for filtering the forum topics.
     * @returns A Promise that resolves to a Collection of ForumTopics.
     */
    fetchMany(channelId: string, options: Omit<OptionQuery<ForumsService["forumTopicReadMany"]>, "channelId">): Promise<Collection<number, PartialForumTopic>> {
        return this.client.rest.router.forums.forumTopicReadMany({ channelId, ...options }).then((data) => {
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
     * @param forumTopicId The ID of the forum topic.
     * @returns a Promise that resolves to a ForumTopic.
     */
    fetch(channelId: string, forumTopicId: number): Promise<ForumTopic> {
        return this.client.rest.router.forums.forumTopicRead({ channelId, forumTopicId }).then((data) => new ForumTopic(this.client, data.forumTopic));
    }

    /**
     * Update a topic in a forum.
     *
     * @param channelId The ID of the channel containing the forum.
     * @param forumTopicId The ID of the forum topic.
     * @param options The options for updating the forum topic.
     * @returns A Promise that resolves to the updated ForumTopic. If cached locally, it will modify that object.
     */
    update(channelId: string, forumTopicId: number, options: OptionBody<ForumsService["forumTopicUpdate"]>): Promise<ForumTopic> {
        return this.client.rest.router.forums.forumTopicUpdate({ channelId, forumTopicId, requestBody: options }).then((data) => {
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
     * @param forumTopicId The ID of the forum topic.
     * @returns A Promise that resolves to nothing.
     */
    delete(channelId: string, forumTopicId: number): Promise<void> {
        return this.client.rest.router.forums.forumTopicDelete({ channelId, forumTopicId }).then(() => void 0);
    }

    /**
     * Pin a topic in a forum.
     *
     * @param channelId The ID of the channel containing the forum.
     * @param forumTopicId The ID of the forum topic.
     * @returns A Promise that resolves to nothing.
     */
    pin(channelId: string, forumTopicId: number): Promise<void> {
        return this.client.rest.router.forums.forumTopicPin({ channelId, forumTopicId }).then(() => void 0);
    }

    /**
     * Unpin a topic in a forum.
     *
     * @param channelId The ID of the channel containing the forum.
     * @param forumTopicId The ID of the forum topic.
     * @returns A Promise that resolves to nothing.
     */
    unpin(channelId: string, forumTopicId: number): Promise<void> {
        return this.client.rest.router.forums.forumTopicUnpin({ channelId, forumTopicId }).then(() => void 0);
    }

    /**
     * Lock a topic in a forum.
     *
     * @param channelId The ID of the channel containing the forum.
     * @param forumTopicId The ID of the forum topic.
     * @returns A Promise that resolves to nothing.
     */
    lock(channelId: string, forumTopicId: number): Promise<void> {
        return this.client.rest.router.forums.forumTopicLock({ channelId, forumTopicId }).then(() => void 0);
    }

    /**
     * Unlock a topic in a forum.
     *
     * @param channelId The ID of the channel containing the forum.
     * @param forumTopicId The ID
     * @returns A Promise that resolves to nothing.
     */
    unlock(channelId: string, forumTopicId: number): Promise<void> {
        return this.client.rest.router.forums.forumTopicUnlock({ channelId, forumTopicId }).then(() => void 0);
    }
}
