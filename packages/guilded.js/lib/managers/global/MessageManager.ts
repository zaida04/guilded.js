import type {
    RESTPostChannelMessagesBody,
    RESTGetChannelMessagesQuery,
} from "@guildedjs/guilded-api-typings";
import type { Message } from "../../structures/Message";
import CacheableStructManager from "./CacheableStructManager";

export default class GlobalMessageManager extends CacheableStructManager<string, Message> {
    /** Get a list of the latest 50 messages from a channel. */
    fetchMany(channelId: string, options: RESTGetChannelMessagesQuery) {
        return this.client.rest.router.getChannelMessages(channelId, options);
    }

    /** Get details for a specific chat message from a chat channel. */
    fetch(channelId: string, messageId: string) {
        return this.client.rest.router.getChannelMessage(channelId, messageId);
    }

    /** Send a message in a channel */
    send(channelId: string, content: RESTPostChannelMessagesBody | string) {
        return this.client.rest.router.createChannelMessage(channelId, content);
    }

    /** Add a reaction emote */
    addReaction(channelId: string, contentId: string, emoteId: number) {
        return this.client.rest.router.addReactionEmote(channelId, contentId, emoteId);
    }

    /** Update a channel message. */
    update(channelId: string, messageId: string, content: string) {
        return this.client.rest.router.updateChannelMessage(channelId, messageId, { content });
    }

    /** Delete a channel message. */
    delete(channelId: string, messageId: string) {
        return this.client.rest.router.deleteChannelMessage(channelId, messageId);
    }
}
