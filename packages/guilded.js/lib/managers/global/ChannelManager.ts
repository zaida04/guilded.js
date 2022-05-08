import type { RESTPostChannelsBody } from "@guildedjs/guilded-api-typings";
import { Channel, DocChannel, ListChannel } from "../../structures";
import { CacheableStructManager } from "./CacheableStructManager";
import type { ChannelType as APIChannelType } from "@guildedjs/guilded-api-typings";

export class GlobalChannelManager extends CacheableStructManager<string, Channel> {
    get shouldCacheChannel() {
        return this.client.options?.cache?.cacheChannels !== false;
    }

    create(options: RESTPostChannelsBody): Promise<Channel> {
        return this.client.rest.router.createChannel(options).then((data) => {
            const newChannel = new (transformTypeToChannel(data.channel.type))(this.client, data.channel);
            return newChannel;
        });
    }
    fetch(channelId: string): Promise<Channel> {
        return this.client.rest.router.getChannel(channelId).then((data) => {
            const fetchedChannel = new (transformTypeToChannel(data.channel.type))(this.client, data.channel);
            if (this.shouldCacheChannel) this.cache.set(fetchedChannel.id, fetchedChannel);
            return fetchedChannel;
        });
    }
    delete(channelId: string): Promise<Channel | void> {
        return this.client.rest.router.deleteChannel(channelId).then((data) => {
            const cachedChannel = this.cache.get(channelId);
            return cachedChannel ?? void 0;
        });
    }
}

export const transformTypeToChannel = (str: APIChannelType) => typeToChannel[str as "docs" | "list"] ?? Channel;

export const typeToChannel = {
    docs: DocChannel,
    list: ListChannel,
};
