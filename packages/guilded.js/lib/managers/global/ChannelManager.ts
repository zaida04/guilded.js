import { ChannelType, RestBody, RestPath } from "@guildedjs/api";
import {
	Channel,
	DocChannel,
	ForumChannel,
	ListChannel,
} from "../../structures";
import { CacheableStructManager } from "./CacheableStructManager";

/**
 * Manages channels on the global scope. This can hold channels of any type, with all of them extending Channel.
 * You will likely need to cast the returned values from cache or fetches
 * @extends CacheableStructManager
 */
export class GlobalChannelManager extends CacheableStructManager<
	string,
	Channel
> {
	/** Determine whether a channel should be cached or not */
	get shouldCacheChannel() {
		return this.client.options?.cache?.cacheChannels !== false;
	}

	/**
	 * Create a new channel
	 * @param options Channel creation options
	 * @returns Promise that resolves with the newly created channel
	 */
	create(options: RestBody<RestPath<"/channels">["post"]>): Promise<Channel> {
		return this.client.rest.router.createChannel(options).then((data) => {
			const newChannel = new (transformTypeToChannel(data.channel.type))(
				this.client,
				data.channel
			);
			return newChannel;
		});
	}

	/**
	 * Fetch a channel by ID
	 * Notice: if you're using TypeScript, you will need to upcast to your desired channel type.
	 * @param channelId ID of the channel to fetch
	 * @param force Whether to force a fetch from the API
	 * @returns Promise that resolves with the fetched channel
	 */
	fetch(channelId: string, force?: boolean): Promise<Channel> {
		if (!force) {
			const existingChannel = this.client.channels.cache.get(channelId);
			if (existingChannel) return Promise.resolve(existingChannel);
		}
		return this.client.rest.router.getChannel(channelId).then((data) => {
			const fetchedChannel = new (transformTypeToChannel(data.channel.type))(
				this.client,
				data.channel
			);
			if (this.shouldCacheChannel)
				this.cache.set(fetchedChannel.id, fetchedChannel);
			return fetchedChannel;
		});
	}

	/**
	 * Update a channel by ID
	 * @param channelId ID of the channel to update
	 * @param options Channel update options
	 * @returns Promise that resolves with the updated channel
	 */
	update(channelId: string, options: RestBody<RestPath<"/channels/{channelId}">["patch"]>): Promise<Channel> {
		return this.client.rest.router
			.updateChannel(channelId, options)
			.then((data) => {
				const existingChannel = this.cache.get(channelId);
				if (existingChannel) return existingChannel._update(data.channel);

				const newChannel = new (transformTypeToChannel(data.channel.type))(
					this.client,
					data.channel
				);
				if (this.shouldCacheChannel) this.cache.set(newChannel.id, newChannel);
				return newChannel;
			});
	}

	/**
	 * Delete a channel by ID
	 * @param channelId ID of the channel to delete
	 * @returns Promise that resolves with the deleted channel, or void if not cached.
	 */
	delete(channelId: string): Promise<Channel | void> {
		return this.client.rest.router.deleteChannel(channelId).then((data) => {
			const cachedChannel = this.cache.get(channelId);
			return cachedChannel ?? void 0;
		});
	}
}

/**
 * Transforms the string APIChannelType to its corresponding channel class
 * @param str String representing the channel type
 * @returns Channel class for the given channel type
 */
export const transformTypeToChannel = (str: ChannelType) =>
	typeToChannel[str as "forums" | "docs" | "list"] ?? Channel;

/** Mapping between the string APIChannelType and the corresponding channel class */
export const typeToChannel = {
	forums: ForumChannel,
	docs: DocChannel,
	list: ListChannel,
};
