import { ChatMessageContent, RESTPostChannelMessagesBody ,RESTGetChannelMessagesQuery, RESTPutChannelMessageBody } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class MessageManager extends GlobalManager {
    /** Get a list of the latest 50 messages from a channel. */
    getMessages(channelId: string, options: RESTGetChannelMessagesQuery) {
        return this.client.rest.router.getChannelMessages(channelId, options);
    }

    /** Get details for a specific chat message from a chat channel. */
    getMessage(channelId: string, messageId: string) {
        return this.client.rest.router.getChannelMessage(channelId, messageId);
    }

    /** Send a message in a channel */
    sendMessage(channelId: string, content: RESTPostChannelMessagesBody | string) {
        return this.client.rest.router.createChannelMessage(channelId, content);
    }

    /** Add a reaction emote */
    addReaction(channelId: string, contentId: string, emoteId: number) {
        return this.client.rest.router.addReactionEmote(channelId, contentId, emoteId);
    }

    /** Update a channel message. */
    updateMessage(channelId: string, messageId: string, content: string) {
        return this.client.rest.router.updateChannelMessage(channelId, messageId, { content });
    }

    /** Delete a channel message. */
    deleteMessage(channelId: string, messageId: string) {
        return this.client.rest.router.deleteChannelMessage(channelId, messageId);
    }
}