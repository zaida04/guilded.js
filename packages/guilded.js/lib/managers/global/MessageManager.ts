import { ChatMessageContent, RESTGetChannelMessagesQuery, RESTPutChannelMessageBody } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class MessageManager extends GlobalManager {
    /** Send a message to a channel */
    createChannelMessage(channelId: string, content: string | ChatMessageContent) {
        return this.client.rest.router.createChannelMessage(channelId, content);
    }

    /** Get a list of the latest 50 messages from a channel. */
    getChannelMessages(channelId: string, options: RESTGetChannelMessagesQuery) {
        return this.client.rest.router.getChannelMessages(channelId, options);
    }

    /** Get details for a specific chat message from a chat channel. */
    getChannelMessage(channelId: string, messageId: string) {
        return this.client.rest.router.getChannelMessage(channelId, messageId);
    }

    /** Update a channel message. */
    updateChannelMessage(channelId: string, messageId: string, content: string) {
        return this.client.rest.router.updateChannelMessage(channelId, messageId, { content });
    }

    /** Delete a channel message. */
    deleteChannelMessage(channelId: string, messageId: string) {
        return this.client.rest.router.deleteChannelMessage(channelId, messageId);
    }

    /** Add a reaction emote */
    addReactionEmote(channelId: string, contentId: string, emoteId: number) {
        return this.client.rest.router.addReactionEmote(channelId, contentId, emoteId);
    }
}