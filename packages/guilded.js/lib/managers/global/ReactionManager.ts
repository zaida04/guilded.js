import { CacheableStructManager } from "./CacheableStructManager";
import type { EmotePayload } from "@guildedjs/guilded-api-typings";
import type { MessageReaction } from "../../structures";

export class GlobalReactionManager extends CacheableStructManager<string, MessageReaction> {
    get shouldCacheReaction() {
        return this.client.options.cache?.cacheMessageReactions !== false;
    }
}
