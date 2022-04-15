import type Collection from "@discordjs/collection";
import type { ChatMessageContent, RESTGetChannelMessagesQuery } from "@guildedjs/guilded-api-typings";
import { Base } from "../Base";
import type { Message } from "../Message";

export class Channel extends Base {
    /** Send a message to this channel. */
    send(content: ChatMessageContent | string): Promise<Message> {
        return this.client.messages.send(this.id, content);
    }

    /** Get a list of the latest 100 messages from a channel. */
    fetchMessages(options?: RESTGetChannelMessagesQuery): Promise<Collection<string, Message>> {
        return this.client.messages.fetchMany(this.id, options ?? {});
    }

    /** Get details for a specific chat message from a chat channel. */
    fetchMessage(messageId: string): Promise<Message> {
        return this.client.messages.fetch(this.id, messageId);
    }

    /** Update a channel message. */
    updateMessage(messageId: string, content: string): Promise<Message> {
        return this.client.messages.update(this.id, messageId, content);
    }

    /** Delete a channel message. */
    deleteMessage(messageId: string): Promise<void> {
        return this.client.messages.delete(this.id, messageId);
    }

    /** Add a reaction emote */
    addReaction(contentId: string, emoteId: number): Promise<void> {
        return this.client.messages.addReaction(this.id, contentId, emoteId);
    }
}
