import { ChatMessageContent, RESTGetChannelMessagesQuery, RESTPutChannelMessageBody } from "@guildedjs/guilded-api-typings";
import Client from "../../Client";
import Base from "../Base";


export default class Channel extends Base {
    /** Send a message to this channel. */
    createMessage(content: ChatMessageContent | string) {
        return this.client.messages.sendMessage(this.id, content);
    }

    /** Get a list of the latest 100 messages from a channel. */
    getMessages(options?: RESTGetChannelMessagesQuery) {
        return this.client.messages.getMessages(this.id, options ?? {});
    }

    /** Get details for a specific chat message from a chat channel. */
    getMessage(messageId: string) {
        return this.client.messages.getMessage(this.id, messageId);
    }

    /** Update a channel message. */
    updateMessage(messageId: string, content: string) {
        return this.client.messages.updateMessage(this.id, messageId, content);
    }

    /** Delete a channel message. */
    deleteMessage(messageId: string) {
        return this.client.messages.deleteMessage(this.id, messageId);
    }

    /** Add a reaction emote */
    addReaction(contentId: string, emoteId: number) {
        return this.client.messages.addReaction(this.id, contentId, emoteId);
    }
}
