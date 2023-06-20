import { Collection } from "@discordjs/collection";
import type { ChatService } from "@guildedjs/api";
import type { CollectorOptions, CollectorReturnValue } from "../../structures";
import { MessageCollector } from "../../structures";
import { Message } from "../../structures/Message";
import type { MaybePromise, MessageContent, OptionQuery } from "../../typings";
import { resolveContentToData } from "../../util";
import { CacheableStructManager } from "./CacheableStructManager";

/**
 * Manager for handling caching and interactions for Messages
 */
export class GlobalMessageManager extends CacheableStructManager<string, Message> {
    /**
     * Whether or not messages should be cached.
     */
    get shouldCacheMessage(): boolean {
        return this.client.options.cache?.cacheMessages !== false;
    }

    /**
     * Fetches multiple messages from a channel.
     *
     * @param channelId The ID of the channel to fetch messages from.
     * @param options Additional options for the fetch.
     * @returns A promise that resolves with a collection of messages.
     */
    async fetchMany(channelId: string, options: Omit<OptionQuery<ChatService["channelMessageReadMany"]>, "channelId">): Promise<Collection<string, Message>> {
        const data = await this.client.rest.router.chat.channelMessageReadMany({
            channelId,
            ...options,
        });
        const messages = new Collection<string, Message>();

        for (const message of data.messages) {
            const newMessage = new Message(this.client, message);
            messages.set(newMessage.id, newMessage);
        }

        return messages;
    }

    /**
     * Fetches a message from a channel.
     *
     * @param channelId The ID of the channel to fetch the message from.
     * @param messageId The ID of the message to fetch.
     * @param force Whether or not to force the fetch.
     * @returns A promise that resolves with the requested message.
     */
    async fetch(channelId: string, messageId: string, force?: boolean): Promise<Message> {
        if (!force) {
            const existingMessage = this.client.messages.cache.get(messageId);
            if (existingMessage) return existingMessage;
        }

        const data = await this.client.rest.router.chat.channelMessageRead({
            channelId,
            messageId,
        });
        const newMessage = new Message(this.client, data.message);
        this.client.messages.cache.set(newMessage.id, newMessage);
        return newMessage;
    }

    /**
     * Sends a message to a channel.
     *
     * @param channelId The ID of the channel to send the message to.
     * @param content The content of the message.
     * @returns A promise that resolves with the created message.
     * @example
     * let replyObj = {
     *  content: 'This is text, supports **markdown**.',
     *  embeds: [{
     *    title: 'This is an embed title!',
     *    description: 'A description may go here'
     *  }]
     * };
     * await message.client.messages.send(message.channelId, replyObj)
     */
    async send(channelId: string, content: MessageContent): Promise<Message> {
        const data = await this.client.rest.router.chat.channelMessageCreate({
            channelId,
            requestBody: resolveContentToData(content),
        });

        const existingMessage = this.client.messages.cache.get(data.message.id);
        if (existingMessage) return existingMessage;

        const newMessage = new Message(this.client, data.message);
        this.client.messages.cache.set(newMessage.id, newMessage);
        return newMessage;
    }

    /**
     * Adds a reaction to a message.
     *
     * @param channelId The ID of the channel containing the message.
     * @param contentId The ID of the message to add a reaction to.
     * @param emoteId The ID of the emote to add as a reaction.
     * @returns A promise that resolves to nothing when the reaction is added.
     */
    async addReaction(channelId: string, contentId: string, emoteId: number): Promise<void> {
        await this.client.reactions.create(channelId, contentId, emoteId);
    }

    /**
     * Deletes a reaction from a message.
     *
     * @param channelId The ID of the channel containing the message.
     * @param contentId The ID of the message to delete the reaction from.
     * @param emoteId The ID of the emote to delete as a reaction.
     * @returns A promise that resolves to nothing when the reaction is deleted.
     */
    async deleteReaction(channelId: string, contentId: string, emoteId: number): Promise<void> {
        await this.client.reactions.delete(channelId, contentId, emoteId);
    }

    /**
     * Updates a message in a channel.
     *
     * @param channelId The ID of the channel containing the message.
     * @param messageId The ID of the message to update.
     * @param content The new content of the message.
     * @returns A promise that resolves with the updated message.
     */
    async update(channelId: string, messageId: string, content: MessageContent): Promise<Message> {
        const data = await this.client.rest.router.chat.channelMessageUpdate({
            channelId,
            messageId,
            requestBody: resolveContentToData(content),
        });

        const existingMessage = this.client.messages.cache.get(data.message.id);
        if (existingMessage) return existingMessage._update(data.message);

        const newMessage = new Message(this.client, data.message);
        this.client.messages.cache.set(newMessage.id, newMessage);
        return newMessage;
    }

    /** Delete a channel message. */
    async delete(channelId: string, messageId: string): Promise<void> {
        await this.client.rest.router.chat.channelMessageDelete({
            channelId,
            messageId,
        });
    }

    async awaitMessages(channelId: string, options: CollectorOptions<Message>): Promise<CollectorReturnValue<Message>> {
        return new MessageCollector(this.client, {
            ...options,
            filter: (item): MaybePromise<boolean> => {
                if (item.channelId !== channelId) return false;
                return options.filter?.(item) ?? true;
            },
        }).start();
    }
}
