import { CacheableStructManager } from "./CacheableStructManager";
import type { EmotePayload } from "@guildedjs/guilded-api-typings";
import type { MessageReaction } from "../../structures";

export class GlobalReactionManager extends CacheableStructManager<string, MessageReaction> {
	get shouldCacheReaction() {
		return this.client.options.cache?.cacheMessageReactions !== false;
	}

	/** Add a reaction emote */
	create(channelId: string, contentId: string, emoteId: number): Promise<void> {
		return this.client.rest.router.addReactionEmote(channelId, contentId, emoteId).then(() => void 0);
	}

	/** Delete a reaction emote */
	delete(channelId: string, contentId: string, emoteId: number): Promise<void> {
		return this.client.rest.router.deleteReactionEmote(channelId, contentId, emoteId).then(() => void 0);
	}
}
