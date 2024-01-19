import type { ChannelsService, ServerChannelPayload } from "@guildedjs/api";
import { Channel, ChatChannel, DocChannel, ForumChannel, ListChannel } from "../../structures";
import { ThreadChannel } from "../../structures/channels/ThreadChannel";
import type { OptionBody } from "../../typings";
import { CacheableStructManager } from "./CacheableStructManager";

/**
 * Manages channels on the global scope. This can hold channels of any type, with all of them extending Channel.
 * You will likely need to cast the returned values from cache or fetches
 *
 * @extends CacheableStructManager
 */
export class GlobalChannelManager extends CacheableStructManager<string, Channel> {
	/** Determine whether a channel should be cached or not */
	get shouldCacheChannel(): boolean {
		return this.client.options?.cache?.cacheChannels !== false;
	}

	/**
	 * Create a new channel
	 *
	 * @param options Channel creation options
	 * @returns Promise that resolves with the newly created channel
	 */
	async create(options: OptionBody<ChannelsService["channelCreate"]>): Promise<Channel> {
		const data = await this.client.rest.router.channels.channelCreate({
			requestBody: options,
		});
		if (data.channel.messageId && data.channel.rootId && data.channel.parentId) {
			return new ThreadChannel(this.client, data.channel);
		}

		return new (transformTypeToChannel(data.channel.type))(this.client, data.channel);
	}

	/**
	 * Fetch a channel by ID
	 * Notice: if you're using TypeScript, you will need to upcast to your desired channel type.
	 *
	 * @param channelId ID of the channel to fetch
	 * @param force Whether to force a fetch from the API
	 * @returns Promise that resolves with the fetched channel
	 */
	async fetch(channelId: string, force?: boolean): Promise<Channel> {
		if (!force) {
			const existingChannel = this.client.channels.cache.get(channelId);
			if (existingChannel) return existingChannel;
		}

		const data = await this.client.rest.router.channels.channelRead({
			channelId,
		});
		const fetchedChannel = new (transformTypeToChannel(data.channel.type))(this.client, data.channel);
		if (this.shouldCacheChannel) this.cache.set(fetchedChannel.id, fetchedChannel);
		return fetchedChannel;
	}

	/**
	 * Update a channel by ID
	 *
	 * @param channelId ID of the channel to update
	 * @param options Channel update options
	 * @returns Promise that resolves with the updated channel
	 */
	async update(channelId: string, options: OptionBody<ChannelsService["channelUpdate"]>): Promise<Channel> {
		const data = await this.client.rest.router.channels.channelUpdate({
			channelId,
			requestBody: options,
		});

		const existingChannel = this.cache.get(channelId);
		if (existingChannel) return existingChannel._update(data.channel);

		const newChannel = new (transformTypeToChannel(data.channel.type))(this.client, data.channel);
		if (this.shouldCacheChannel) this.cache.set(newChannel.id, newChannel);
		return newChannel;
	}

	/**
	 * Delete a channel by ID
	 *
	 * @param channelId ID of the channel to delete
	 * @returns Promise that resolves with the deleted channel, or null if not cached.
	 */
	async delete(channelId: string): Promise<Channel | null> {
		await this.client.rest.router.channels.channelDelete({
			channelId,
		});
		const cachedChannel = this.cache.get(channelId);
		return cachedChannel ?? null;
	}

	/**
	 * Archive a channel by ID
	 *
	 * @param channelId ID of the channel to archive
	 * @returns Promise that resolves with the archived channel or null if not cached
	 */
	async archive(channelId: string): Promise<Channel | null> {
		await this.client.rest.router.channels.channelArchiveCreate({
			channelId,
		});
		const existingChannel = this.cache.get(channelId);
		return existingChannel ?? null;
	}

	/**
	 * Unarchive a channel by ID
	 *
	 * @param channelId ID of the channel to unarchive
	 * @returns Promise that resolves with the unarchived channel or null if not cached
	 */
	async unarchive(channelId: string): Promise<Channel | null> {
		await this.client.rest.router.channels.channelArchiveDelete({
			channelId,
		});
		const existingChannel = this.cache.get(channelId);
		return existingChannel ?? null;
	}
}

/**
 * Transforms the string APIChannelType to its corresponding channel class
 *
 * @param str String representing the channel type
 * @returns Channel class for the given channel type
 */
export const transformTypeToChannel = (str: ServerChannelPayload["type"]): (typeof typeToChannel)[keyof typeof typeToChannel] => typeToChannel[str as "chat" | "docs" | "forums" | "list"] ?? Channel;

/** Mapping between the string APIChannelType and the corresponding channel class */
export const typeToChannel = {
	chat: ChatChannel,
	forums: ForumChannel,
	docs: DocChannel,
	list: ListChannel,
};
