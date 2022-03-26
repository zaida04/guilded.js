import { ChatMessageContent, RESTGetChannelMessagesQuery, RESTPutChannelMessageBody } from "@guildedjs/guilded-api-typings";
import Client from "../Client";
import { Base }  from "../Base";

export default class Channel extends Base {
    /** Send a message to this channel. */
    sendMessage(content: ChatMessageContent | string) {
        return this.client.messages.send(this.id, content);
    }

    /** Get a list of the latest 100 messages from a channel. */
    fetchMessages(options?: RESTGetChannelMessagesQuery) {
        return this.client.messages.fetchMany(this.id, options ?? {});
    }

    /** Get details for a specific chat message from a chat channel. */
    fetchMessage(messageId: string) {
        return this.client.messages.fetch(this.id, messageId);
    }

    /** Update a channel message. */
    updateMessage(messageId: string, content: string) {
        return this.client.messages.update(this.id, messageId, content);
    }

    /** Delete a channel message. */
    deleteMessage(messageId: string) {
        return this.client.messages.delete(this.id, messageId);
    }

    /** Add a reaction emote */
    addReaction(contentId: string, emoteId: number) {
        return this.client.messages.addReaction(this.id, contentId, emoteId);
    }
}
