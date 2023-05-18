import { Schema } from "@guildedjs/api";
import { Base } from "./Base";
import type { Client } from "./Client";

/**
 * Represents a forum topic in Guilded.
 */
export class ForumTopic extends Base<Schema<"ForumTopic">, number> {
	/**
	 * The server ID of the forum topic.
	 */
	readonly serverId: string;
	/**
	 * The channel ID of the forum topic.
	 */
	readonly channelId: string;
	/**
	 * The title of the forum topic.
	 */
	title!: string;
	/**
	 * The creation date of the forum topic.
	 */
	readonly _createdAt: number;
	/**
	 * The user ID of the user who created the forum topic.
	 */
	readonly createdBy: string;
	/**
	 * The date time the forum topic was last updated, or null if it hasn't been updated.
	 */
	_updatedAt!: number | null;
	/**
	 * The date time the forum topic was last bumped, or null if it hasn't been bumped.
	 */
	_bumpedAt!: number | null;
	/**
	 * The date time the forum topic was deleted, or null if it hasn't been deleted.
	 */
	_deletedAt: number | null;
	/**
	 * Whether the forum topic is pinned.
	 */
	isPinned: boolean;
	/**
	 * Whether the forum topic is locked.
	 */
	isLocked: boolean;
	/**
	 * The content of the forum topic.
	 */
	content!: string;
	/**
	 * The mentions in the forum topic.
	 */
	mentions!: Schema<"Mentions">;

	constructor(client: Client, data: Schema<"ForumTopic">) {
		super(client, data);
		this.serverId = data.serverId;
		this.channelId = data.channelId;
		this._createdAt = Date.parse(data.createdAt);
		this.createdBy = data.createdBy;
		this.isPinned = false;
		this.isLocked = false;
		this._deletedAt = null;

		this._update(data);
	}

	/**
	 * Gets the creation date of the forum topic.
	 * @returns A Date object
	 */
	get createdAt(): Date {
		return new Date(this._createdAt);
	}

	/**
	 * Gets the date the forum topic was deleted, or null if it hasn't been deleted.
	 * @returns A Date object
	 */
	get deletedAt(): Date | null {
		return this._deletedAt ? new Date(this._deletedAt) : null;
	}

	/**
	 * Gets the date the forum topic was last updated, or null if it hasn't been updated.
	 * @returns A Date object
	 */
	get updatedAt(): Date | null {
		return this._updatedAt ? new Date(this._updatedAt) : null;
	}

	_update(data: Partial<Schema<"ForumTopic"> & { _deletedAt?: Date }>) {
		if ("updatedAt" in data && typeof data.updatedAt !== "undefined") {
			this._updatedAt = data.updatedAt ? Date.parse(data.updatedAt) : null;
		}

		if ("_deletedAt" in data && typeof data._deletedAt !== "undefined") {
			this._deletedAt = data._deletedAt.getTime();
		}

		if ("bumpedAt" in data && typeof data.bumpedAt !== "undefined") {
			this._bumpedAt = data.bumpedAt ? Date.parse(data.bumpedAt) : null;
		}

		if ("isPinned" in data && typeof data.isPinned !== "undefined") {
			this.isPinned = data.isPinned;
		}

		if ("isLocked" in data && typeof data.isLocked !== "undefined") {
			this.isLocked = data.isLocked;
		}

		if ("title" in data && typeof data.title !== "undefined") {
			this.title = data.title;
		}

		if ("content" in data && typeof data.content !== "undefined") {
			this.content = data.content;
		}

		if ("mentions" in data && typeof data.mentions !== "undefined") {
			this.mentions = data.mentions;
		}

		return this;
	}
}

//     ""channelId"
/** A partial summary representation of a forum topic. Can fetch this topic to get full data */
export class PartialForumTopic extends Base<
	Schema<"ForumTopicSummary">,
	number
> {
	/**
	 * The ID of the server this role belongs to
	 */
	readonly serverId: string;
	/**
	 * The date time the forum topic was last updated, or null if it hasn't been updated.
	 */
	_updatedAt!: number | null;
	/**
	 * The date time the forum topic was last bumped, or null if it hasn't been bumped.
	 */
	_bumpedAt!: number | null;
	/**
	 * The title of the forum topic.
	 */
	title!: string;
	/**
	 * Whether the forum topic is pinned.
	 */
	isPinned: boolean;
	/**
	 * The creation date of the forum topic.
	 */
	readonly _createdAt: number;
	/**
	 * The user ID of the user who created the forum topic.
	 */
	readonly createdBy: string;
	/**
	 * The channel ID of the forum topic.
	 */
	readonly channelId: string;

	constructor(client: Client, data: Schema<"ForumTopicSummary">) {
		super(client, data);
		this.serverId = data.serverId;
		this.channelId = data.channelId;
		this._createdAt = Date.parse(data.createdAt);
		this.createdBy = data.createdBy;
		this.isPinned = false;

		this._update(data);
	}

	_update(data: Partial<Schema<"ForumTopic"> & { _deletedAt?: Date }>) {
		if ("updatedAt" in data && typeof data.updatedAt !== "undefined") {
			this._updatedAt = data.updatedAt ? Date.parse(data.updatedAt) : null;
		}

		if ("bumpedAt" in data && typeof data.bumpedAt !== "undefined") {
			this._bumpedAt = data.bumpedAt ? Date.parse(data.bumpedAt) : null;
		}

		if ("isPinned" in data && typeof data.isPinned !== "undefined") {
			this.isPinned = data.isPinned;
		}

		if ("title" in data && typeof data.title !== "undefined") {
			this.title = data.title;
		}

		return this;
	}

	/**
	 * Gets the creation date of the forum topic.
	 * @returns A Date object
	 */
	get createdAt(): Date {
		return new Date(this._createdAt);
	}

	/**
	 * Gets the date the forum topic was last updated, or null if it hasn't been updated.
	 * @returns A Date object
	 */
	get updatedAt(): Date | null {
		return this._updatedAt ? new Date(this._updatedAt) : null;
	}

	/**
	 * Fetch the full member object of this partial member
	 * @returns A promise containing the resolved full member.
	 */
	fetch(): Promise<ForumTopic> {
		return this.client.topics.fetch(this.serverId, this.id);
	}
}
