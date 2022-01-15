import { GetChannelMessagesOptions, MessageContent, UpdateChannelMessageOptions } from "@guildedjs/rest";
import Client from "../Client";
import { Base } from "./Base";

export interface ChannelPayload {
    id: string;
}

export default class Channel extends Base {
    /** The id of the channel. */
    id: string;

    constructor(client: Client, payload: ChannelPayload) {
        super(client);

        this.id = payload.id;
    }

    /** Send a message to this channel. */
    createMessage(content: MessageContent | string) {
        return this.client.createChannelMessage(this.id, content);
    }

    /** Get a list of the latest 50 messages from a channel. */
    getMessages(options?: GetChannelMessagesOptions) {
        return this.client.getChannelMessages(this.id, options ?? {});
    }

    /** Get details for a specific chat message from a chat channel. */
    getMessage(messageId: string) {
        return this.client.getChannelMessage(this.id, messageId);
    }

    /** Update a channel message. */
    updateMessage(messageId: string, options: UpdateChannelMessageOptions) {
        return this.client.updateChannelMessage(this.id, messageId, options);
    }

    /** Delete a channel message. */
    deleteMessage(messageId: string) {
        return this.client.deleteChannelMessage(this.id, messageId);
    }

    /** Add a reaction emote */
    addReactionEmote(contentId: string, emoteId: number) {
        return this.client.addReactionEmote(this.id, contentId, emoteId);
    }
}
