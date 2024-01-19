import { Collection } from "@discordjs/collection";
import type { ForumTopicPayload } from "@guildedjs/api";
import type { ForumTopic } from "../Forum";
import { Channel } from "./Channel";

/**
 * Represents a forum channel in Guilded.
 *
 * @extends Channel
 */
export class ForumChannel extends Channel {
	/** The topics in this channel. */
	readonly topics =
		new Collection<
			string,
			ForumTopicPayload
		>();

	/**
	 * Creates a topic in this forum channel.
	 *
	 * @param title - The title of the new topic.
	 * @param content - The content of the new topic.
	 * @returns A Promise that resolves with the newly created topic payload.
	 */
	createTopic(
		title: string,
		content: string,
	): Promise<ForumTopic> {
		return this.client.topics.create(
			this
				.id,
			{
				title,
				content,
			},
		);
	}

	/**
	 * Deletes a topic from this forum channel.
	 *
	 * @param forumTopicId - The ID of the topic to delete.
	 * @returns A Promise that resolves when the topic is deleted.
	 */
	deleteTopic(
		forumTopicId: number,
	): Promise<void> {
		return this.client.topics.delete(
			this
				.id,
			forumTopicId,
		);
	}
}
