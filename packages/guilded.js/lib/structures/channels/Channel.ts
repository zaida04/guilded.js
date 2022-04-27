import type Collection from "@discordjs/collection";
import type { RESTPostChannelMessagesBody, RESTGetChannelMessagesQuery } from "@guildedjs/guilded-api-typings";
import { Base } from "../Base";
import type { Message } from "../Message";

export class Channel extends Base {
    /** Get a list of the latest 100 messages from a channel. */
    fetchMessages(options?: RESTGetChannelMessagesQuery): Promise<Collection<string, Message>> {
        return this.client.messages.fetchMany(this.id, options ?? {});
    }

    /** Get details for a specific chat message from a chat channel. */
    fetchMessage(messageId: string): Promise<Message> {
        return this.client.messages.fetch(this.id, messageId);
    }
}
