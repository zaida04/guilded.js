import { WSPacket } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import type { ListChannel } from "../../structures";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class ListEventHandler extends GatewayEventHandler {
	listItemCompleted(data: WSPacket<"ListItemCompleted">) {
		const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
		if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
		return this.client.emit(constants.clientEvents.LIST_ITEM_COMPLETED, data.d.listItem);
	}
	listItemUncompleted(data: WSPacket<"ListItemUncompleted">) {
		const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
		if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
		return this.client.emit(constants.clientEvents.LIST_ITEM_UNCOMPLETED, data.d.listItem);
	}
	listItemCreated(data: WSPacket<"ListItemCreated">) {
		const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
		if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
		return this.client.emit(constants.clientEvents.LIST_ITEM_CREATED, data.d.listItem);
	}
	listItemUpdated(data: WSPacket<"ListItemUpdated">) {
		const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
		const existingItem = existingChannel?.items.get(data.d.listItem.id);
		if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
		return this.client.emit(constants.clientEvents.LIST_ITEM_UPDATED, data.d.listItem, existingItem ?? null);
	}
	listItemDeleted(data: WSPacket<"ListItemDeleted">) {
		const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
		if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
		return this.client.emit(constants.clientEvents.LIST_ITEM_DELETED, data.d.listItem);
	}
}
