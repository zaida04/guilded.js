import { CacheableStructManager } from "./CacheableStructManager";
import type { MessageReaction } from "../../structures";

/**
 * A class representing a global reaction manager that extends the CacheableStructManager class.
 */
export class GlobalReactionManager extends CacheableStructManager<
  string,
  MessageReaction
> {
  get shouldCacheReaction() {
    return this.client.options.cache?.cacheMessageReactions !== false;
  }

  /**
   * Adds a reaction emote to a message.
   * @param channelId The ID of the channel where the message was sent.
   * @param contentId The ID of the message.
   * @param emoteId The ID of the emote to add.
   * @returns A Promise that resolves with no value upon successful completion.
   */
  create(channelId: string, contentId: string, emoteId: number): Promise<void> {
    return this.client.rest.router
      .addReactionEmote(channelId, contentId, emoteId)
      .then(() => void 0);
  }

  /**
   * Deletes a reaction emote from a message.
   * @param channelId The ID of the channel where the message was sent.
   * @param contentId The ID of the message.
   * @param emoteId The ID of the emote to delete.
   * @returns A Promise that resolves with no value upon successful completion.
   */
  delete(channelId: string, contentId: string, emoteId: number): Promise<void> {
    return this.client.rest.router
      .deleteReactionEmote(channelId, contentId, emoteId)
      .then(() => void 0);
  }
}
