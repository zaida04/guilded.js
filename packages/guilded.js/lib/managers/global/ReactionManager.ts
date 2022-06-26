import { CacheableStructManager } from "./CacheableStructManager";
import type { EmotePayload } from "@guildedjs/guilded-api-typings";

export class GlobalReactionManager extends CacheableStructManager<
    string,
    EmotePayload & { channelId: string; createdBy: string; serverId: string; messageId: string }
> {
    get shouldCacheReaction() {
        return this.client.options.cache?.cacheMessageReactions !== false;
    }
}
