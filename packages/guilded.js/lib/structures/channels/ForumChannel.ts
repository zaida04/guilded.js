import { Collection } from "@discordjs/collection";
import type { ForumTopicPayload } from "@guildedjs/guilded-api-typings";
import { Channel } from "./Channel";

export class ForumChannel extends Channel {
    /** The topics in this channel. */
    readonly topics = new Collection<string, ForumTopicPayload>();

    /** Create a topic in a forum */
    createTopic(title: string, content: string): Promise<ForumTopicPayload> {
        return this.client.topics.createForumTopic(this.id, { title, content });
    }

    /** Delete a topic in a forum */
    deleteTopic(id: string): Promise<void> {
        return this.client.topics.deleteForumTopic(this.id, id);
    }
}
