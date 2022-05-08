import type {
    WSTeamChannelCreated,
    WSTeamChannelDeleted,
    WSTeamChannelUpdated,
    WSTeamWebhookCreatedPayload,
    WSTeamWebhookUpdatedPayload,
} from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { transformTypeToChannel } from "../../managers/global/ChannelManager";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class TeamChannelEventHandler extends GatewayEventHandler {
    TeamChannelCreated(data: WSTeamChannelCreated): boolean {
        const existingChannel = this.client.channels.cache.get(data.d.channel.id);
        if (existingChannel) return this.client.emit(constants.clientEvents.CHANNEL_CREATED, existingChannel);

        const newChannel = new (transformTypeToChannel(data.d.channel.type))(this.client, data.d.channel);
        if (this.client.channels.shouldCacheChannel) this.client.channels.cache.set(newChannel.id, newChannel);
        return this.client.emit(constants.clientEvents.CHANNEL_CREATED, newChannel);
    }
    TeamChannelUpdated(data: WSTeamChannelUpdated): boolean {
        const existingChannel = this.client.channels.cache.get(data.d.channel.id);
        const oldChannel = existingChannel?._clone();
        const updatedChannel =
            existingChannel?._update(data.d.channel) ?? new (transformTypeToChannel(data.d.channel.type))(this.client, data.d.channel);
        return this.client.emit(constants.clientEvents.CHANNEL_UPDATED, updatedChannel, oldChannel ?? null);
    }
    TeamChannelDeleted(data: WSTeamChannelDeleted): boolean {
        const existingChannel = this.client.channels.cache.get(data.d.channel.id);
        const deletedChannel =
            existingChannel?._update({ ...data.d.channel, deleted: true }) ??
            new (transformTypeToChannel(data.d.channel.type))(this.client, data.d.channel);
        if (this.client.options.cache?.removeChannelOnDelete) this.client.channels.cache.delete(deletedChannel.id);
        return this.client.emit(constants.clientEvents.CHANNEL_DELETED, deletedChannel);
    }
}
