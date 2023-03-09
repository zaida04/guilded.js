import { Collection } from "@discordjs/collection";
import type { ForumTopicPayload } from "@guildedjs/guilded-api-typings";
import { Channel } from "./Channel";
import type { ForumTopic } from "../Forum";

/**
 * Represents a forum channel in Guilded.
 * @extends Channel
 */
export class ForumChannel extends Channel {
    /** The topics in this channel. */
    readonly topics = new Collection<string, ForumTopicPayload>();

    /**
     * Creates a topic in this forum channel.
     * @param title - The title of the new topic.
     * @param content - The content of the new topic.
     * @returns A Promise that resolves with the newly created topic payload.
     */
    createTopic(title: string, content: string): Promise<ForumTopic> {
        return this.client.topics.create(this.id, { title, content });
    }

    /**
     * Deletes a topic from this forum channel.
     * @param id - The ID of the topic to delete.
     * @returns A Promise that resolves when the topic is deleted.
     */
    deleteTopic(id: string): Promise<void> {
        return this.client.topics.delete(this.id, id);
    }
}