import type { ForumTopicPayload, RESTGetForumTopicsQuery, RESTPatchForumTopicBody, RESTPostForumTopicBody } from "@guildedjs/guilded-api-typings";
import type { ForumTopic } from "../../structures/Forum";
import { CacheableStructManager } from "./CacheableStructManager";
import { GlobalManager } from "./GlobalManager";

export class GlobalForumTopicManager extends CacheableStructManager<number, ForumTopic> {
    get shouldCacheForumTopic() {
        return this.client.options.cache?.cacheForumTopics !== false;
    }

    /** Create a topic in a forum */
    createForumTopic(channelId: string, options: RESTPostForumTopicBody): Promise<ForumTopicPayload> {
        return this.client.rest.router.createForumTopic(channelId, options).then((data) => data.forumTopic);
    }

    /** Get all topics in a forum */
    getForumTopics(channelId: string, options: RESTGetForumTopicsQuery) {
        return this.client.rest.router.getForumTopics(channelId, options);
    }

    /** Get a topic in a forum */
    getForumTopic(channelId: string, forumThreadId: string) {
        return this.client.rest.router.getForumTopic(channelId, forumThreadId);
    }

    /** Update a topic in a forum */
    updateForumTopic(channelId: string, forumThreadId: string, options: RESTPatchForumTopicBody) {
        return this.client.rest.router.updateForumTopic(channelId, forumThreadId, options);
    }

    /** Delete a topic in a forum */
    deleteForumTopic(channelId: string, forumThreadId: string) {
        return this.client.rest.router.deleteForumTopic(channelId, forumThreadId);
    }

    /** Pin a topic in a forum */
    pinForumTopic(channelId: string, forumThreadId: string) {
        return this.client.rest.router.pinForumTopic(channelId, forumThreadId);
    }

    /** Unpin a topic in a forum */
    unpinForumTopic(channelId: string, forumThreadId: string) {
        return this.client.rest.router.unpinForumTopic(channelId, forumThreadId);
    }

    /** Lock a topic in a forum */
    lockForumTopic(channelId: string, forumThreadId: string) {
        return this.client.rest.router.lockForumTopic(channelId, forumThreadId);
    }

    /** Unlock a topic in a forum */
    unlockForumTopic(channelId: string, forumThreadId: string) {
        return this.client.rest.router.unlockForumTopic(channelId, forumThreadId);
    }
}
