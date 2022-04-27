import type { RESTPostChannelMessagesBody, RESTGetChannelMessagesQuery } from "@guildedjs/guilded-api-typings";
import { Message } from "../../structures/Message";
import { CacheableStructManager } from "./CacheableStructManager";
import Collection from "@discordjs/collection";
import type { Embed } from "@guildedjs/embeds";
import { resolveContentToData } from "../../util";

export class GlobalMessageManager extends CacheableStructManager<string, Message> {
    /** Get a list of the latest 50 messages from a channel. */
    fetchMany(channelId: string, options: RESTGetChannelMessagesQuery): Promise<Collection<string, Message>> {
        return this.client.rest.router.getChannelMessages(channelId, options).then((data) => {
            const messages = new Collection<string, Message>();
            for (const message of data.messages) {
                const newMessage = new Message(this.client, message);
                messages.set(newMessage.id, newMessage);
            }
            return messages;
        });
    }

    /** Get details for a specific chat message from a chat channel. */
    fetch(channelId: string, messageId: string, force?: boolean): Promise<Message> {
        if (!force) {
            const existingMessage = this.client.messages.cache.get(messageId);
            if (existingMessage) return Promise.resolve(existingMessage);
        }
        return this.client.rest.router.getChannelMessage(channelId, messageId).then((data) => {
            const newMessage = new Message(this.client, data.message);
            this.client.messages.cache.set(newMessage.id, newMessage);
            return newMessage;
        });
    }

    /** Send a message in a channel */
    send(channelId: string, content: RESTPostChannelMessagesBody | string | Embed): Promise<Message> {
        return this.client.rest.router.createChannelMessage(channelId, resolveContentToData(content)).then((data) => {
            // This is in the case of which the WS gateway beats us to adding the message to the cache. If they haven't, then we do it ourselves.
            const existingMessage = this.client.messages.cache.get(data.message.id);
            if (existingMessage) return existingMessage;
            const newMessage = new Message(this.client, data.message);
            this.client.messages.cache.set(newMessage.id, newMessage);
            return newMessage;
        });
    }

    /** Add a reaction emote */
    addReaction(channelId: string, contentId: string, emoteId: number): Promise<void> {
        return this.client.rest.router.addReactionEmote(channelId, contentId, emoteId).then(() => void 0);
    }

    /** Update a channel message. */
    update(channelId: string, messageId: string, content: RESTPostChannelMessagesBody | string): Promise<Message> {
        return this.client.rest.router.updateChannelMessage(channelId, messageId, resolveContentToData(content)).then((data) => {
            // This is in the case of which the WS gateway beats us to modifying the message in the cache. If they haven't, then we do it ourselves.
            const existingMessage = this.client.messages.cache.get(data.message.id);
            if (existingMessage) return existingMessage._update(data.message);

            const newMessage = new Message(this.client, data.message);
            this.client.messages.cache.set(newMessage.id, newMessage);
            return newMessage;
        });
    }

    /** Delete a channel message. */
    delete(channelId: string, messageId: string): Promise<void> {
        return this.client.rest.router.deleteChannelMessage(channelId, messageId).then(() => void 0);
    }
}
