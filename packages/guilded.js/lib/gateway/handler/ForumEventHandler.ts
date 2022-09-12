import type {
    WSListItemUncompleted,
    WSListItemCompleted,
    WSListItemCreated,
    WSListItemUpdated,
    WSListItemDeleted,
    WSForumTopicCreated,
    WSForumTopicUpdated,
    WSForumTopicDeleted,
    WSForumTopicPinned,
    WSForumTopicUnpinned,
} from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import type { ListChannel } from "../../structures";
import { ForumTopic } from "../../structures/Forum";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class ForumEventHandler extends GatewayEventHandler {
    forumTopicCreated(data: WSForumTopicCreated) {
        // This is in the case that a REST request beats us to adding the topic in the cache.
        const existingTopic = this.client.topics.cache.get(data.d.forumTopic.id);
        if (existingTopic) return this.client.emit(constants.clientEvents.FORUM_TOPIC_CREATED, existingTopic);

        const newTopic = new ForumTopic(this.client, data.d.forumTopic);
        if(this.client.topics.shouldCacheForumTopic) this.client.topics.cache.set(newTopic.id, newTopic);
        return this.client.emit(constants.clientEvents.FORUM_TOPIC_CREATED, newTopic);
    }
    forumTopicUpdated(data: WSForumTopicUpdated) {
        const getCachedtopic = this.client.topics.cache.get(data.d.forumTopic.id);
        if (!getCachedtopic) {
            const newtopic = new ForumTopic(this.client, data.d.forumTopic);
            return this.client.emit(constants.clientEvents.FORUM_TOPIC_UPDATED, newtopic, null);
        }
        const frozenOldtopic = Object.freeze(getCachedtopic._clone());
        getCachedtopic._update(data.d.forumTopic);
        return this.client.emit(constants.clientEvents.FORUM_TOPIC_UPDATED, getCachedtopic, frozenOldtopic);
    }
    forumTopicDeleted(data: WSForumTopicDeleted) {
        const getCachedtopic = this.client.topics.cache.get(data.d.forumTopic.id);
        getCachedtopic?._update({ _deletedAt: new Date() });
        return this.client.emit(constants.clientEvents.FORUM_TOPIC_DELETED, getCachedtopic ?? new ForumTopic(this.client, data.d.forumTopic));
    }
    forumTopicPinned(data: WSForumTopicPinned) {
        const getCachedtopic = this.client.topics.cache.get(data.d.forumTopic.id);
        getCachedtopic?._update({ isPinned: true });
        return this.client.emit(constants.clientEvents.FORUM_TOPIC_PINNED, getCachedtopic ?? new ForumTopic(this.client, data.d.forumTopic));
    }
    forumTopicUnpinned(data: WSForumTopicUnpinned) {
        const getCachedtopic = this.client.topics.cache.get(data.d.forumTopic.id);
        getCachedtopic?._update({ isPinned: false });
        return this.client.emit(constants.clientEvents.FORUM_TOPIC_UNPINNED, getCachedtopic ?? new ForumTopic(this.client, data.d.forumTopic));
    }
}
