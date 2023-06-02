import { CacheableStructManager } from "./CacheableStructManager";
import {
  CollectorOptions,
  MessageReaction,
  ReactionCollector,
} from "../../structures";

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
  create(channelId: string, messageId: string, emoteId: number): Promise<void> {
    return this.client.rest.router.reactions
      .channelMessageReactionCreate({ channelId, messageId, emoteId })
      .then(() => void 0);
  }

  /**
   * Deletes either a whole reaction emote from a message or a specific user's.
   * @param channelId The ID of the channel where the message was sent.
   * @param contentId The ID of the message.
   * @param emoteId The ID of the emote to delete.
   * @returns A Promise that resolves with no value upon successful completion.
   */
  delete(channelId: string, messageId: string, emoteId: number, userId?: string): Promise<void> {
    return this.client.rest.router.reactions
      .channelMessageReactionDelete({ channelId, messageId, emoteId, userId })
      .then(() => void 0);
  }

  /**
   * Wait & collect reactions on a message.
   * @param messageId ID of the message to listen for reactions on
   * @param options Configuration for the collector
   * @returns Collection of reactions collected with the ID as the key and the reaction as the value
   * @example
   * const reactions = await client.reactions.awaitReactions('message-id-here', { max: 4, time: 60_000 });
   */
  awaitReactions(
    messageId: string,
    options: CollectorOptions<MessageReaction>
  ) {
    return new ReactionCollector(this.client, {
      ...options,
      filter: (item) => {
        if (item.messageId !== messageId) return false;
        return options.filter?.(item) ?? true;
      },
    }).start();
  }
}
