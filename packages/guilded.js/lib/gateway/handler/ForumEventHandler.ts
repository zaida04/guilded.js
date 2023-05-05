import { WSPacket } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { ForumTopic } from "../../structures/Forum";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class ForumEventHandler extends GatewayEventHandler {
	forumTopicCreated(data: WSPacket<"ForumTopicCreated">) {
		// This is in the case that a REST request beats us to adding the topic in the cache.
		const existingTopic = this.client.topics.cache.get(data.d.forumTopic.id);
		if (existingTopic)
			return this.client.emit(
				constants.clientEvents.FORUM_TOPIC_CREATED,
				existingTopic
			);

		const newTopic = new ForumTopic(this.client, data.d.forumTopic);
		if (this.client.topics.shouldCacheForumTopic)
			this.client.topics.cache.set(newTopic.id, newTopic);
		return this.client.emit(
			constants.clientEvents.FORUM_TOPIC_CREATED,
			newTopic
		);
	}
	forumTopicUpdated(data: WSPacket<"ForumTopicUpdated">) {
		const getCachedTopic = this.client.topics.cache.get(data.d.forumTopic.id);
		if (!getCachedTopic) {
			const newTopic = new ForumTopic(this.client, data.d.forumTopic);
			return this.client.emit(
				constants.clientEvents.FORUM_TOPIC_UPDATED,
				newTopic,
				null
			);
		}
		const frozenOldTopic = Object.freeze(getCachedTopic._clone());
		getCachedTopic._update(data.d.forumTopic);
		return this.client.emit(
			constants.clientEvents.FORUM_TOPIC_UPDATED,
			getCachedTopic,
			frozenOldTopic
		);
	}
	forumTopicDeleted(data: WSPacket<"ForumTopicDeleted">) {
		const getCachedTopic = this.client.topics.cache.get(data.d.forumTopic.id);
		getCachedTopic?._update({ _deletedAt: new Date() });
		return this.client.emit(
			constants.clientEvents.FORUM_TOPIC_DELETED,
			getCachedTopic ?? new ForumTopic(this.client, data.d.forumTopic)
		);
	}
	forumTopicPinned(data: WSPacket<"ForumTopicPinned">) {
		const getCachedTopic = this.client.topics.cache.get(data.d.forumTopic.id);
		getCachedTopic?._update({ isPinned: true });
		return this.client.emit(
			constants.clientEvents.FORUM_TOPIC_PINNED,
			getCachedTopic ?? new ForumTopic(this.client, data.d.forumTopic)
		);
	}
	forumTopicUnpinned(data: WSPacket<"ForumTopicUnpinned">) {
		const getCachedTopic = this.client.topics.cache.get(data.d.forumTopic.id);
		getCachedTopic?._update({ isPinned: false });
		return this.client.emit(
			constants.clientEvents.FORUM_TOPIC_UNPINNED,
			getCachedTopic ?? new ForumTopic(this.client, data.d.forumTopic)
		);
	}
	forumTopicLocked(data: WSPacket<"ForumTopicLocked">) {
		const getCachedTopic = this.client.topics.cache.get(data.d.forumTopic.id);
		getCachedTopic?._update({ isLocked: true });
		return this.client.emit(
			constants.clientEvents.FORUM_TOPIC_LOCKED,
			getCachedTopic ?? new ForumTopic(this.client, data.d.forumTopic)
		);
	}
	forumTopicUnlocked(data: WSPacket<"ForumTopicUnlocked">) {
		const getCachedTopic = this.client.topics.cache.get(data.d.forumTopic.id);
		getCachedTopic?._update({ isLocked: false });
		return this.client.emit(
			constants.clientEvents.FORUM_TOPIC_UNLOCKED,
			getCachedTopic ?? new ForumTopic(this.client, data.d.forumTopic)
		);
	}
}
