import { WSPacket } from "@guildedjs/api";
import { constants } from "../../constants";
import { transformTypeToChannel } from "../../managers/global/ChannelManager";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class ServerChannelEventHandler extends GatewayEventHandler {
	serverChannelCreated(data: WSPacket<"ServerChannelCreated">): boolean {
		const existingChannel = this.client.channels.cache.get(data.d.channel.id);
		if (existingChannel)
			return this.client.emit(
				constants.clientEvents.CHANNEL_CREATED,
				existingChannel
			);

		const newChannel = new (transformTypeToChannel(data.d.channel.type))(
			this.client,
			data.d.channel
		);
		if (this.client.channels.shouldCacheChannel)
			this.client.channels.cache.set(newChannel.id, newChannel);
		return this.client.emit(constants.clientEvents.CHANNEL_CREATED, newChannel);
	}
	serverChannelUpdated(data: WSPacket<"ServerChannelUpdated">): boolean {
		const existingChannel = this.client.channels.cache.get(data.d.channel.id);
		const oldChannel = existingChannel?._clone();
		const updatedChannel =
			existingChannel?._update(data.d.channel) ??
			new (transformTypeToChannel(data.d.channel.type))(
				this.client,
				data.d.channel
			);
		return this.client.emit(
			constants.clientEvents.CHANNEL_UPDATED,
			updatedChannel,
			oldChannel ?? null
		);
	}
	serverChannelDeleted(data: WSPacket<"ServerChannelDeleted">): boolean {
		const existingChannel = this.client.channels.cache.get(data.d.channel.id);
		const deletedChannel =
			existingChannel?._update({ ...data.d.channel, deleted: true }) ??
			new (transformTypeToChannel(data.d.channel.type))(
				this.client,
				data.d.channel
			);
		if (this.client.options.cache?.removeChannelOnDelete)
			this.client.channels.cache.delete(deletedChannel.id);
		return this.client.emit(
			constants.clientEvents.CHANNEL_DELETED,
			deletedChannel
		);
	}
}
