import type {
    WSListItemUncompleted,
    WSListItemCompleted,
    WSListItemCreated,
    WSListItemUpdated,
    WSListItemDeleted,
} from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import type { ListChannel } from "../../structures";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class ListEventHandler extends GatewayEventHandler {
    listItemCompleted(data: WSListItemCompleted) {
        const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
        if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
        return this.client.emit(constants.clientEvents.LIST_ITEM_COMPLETED, data.d.listItem);
    }
    listItemUncompleted(data: WSListItemUncompleted) {
        const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
        if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
        return this.client.emit(constants.clientEvents.LIST_ITEM_UNCOMPLETED, data.d.listItem);
    }
    listItemCreated(data: WSListItemCreated) {
        const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
        if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
        return this.client.emit(constants.clientEvents.LIST_ITEM_CREATED, data.d.listItem);
    }
    listItemUpdated(data: WSListItemUpdated) {
        const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
        const existingItem = existingChannel?.items.get(data.d.listItem.id);
        if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
        return this.client.emit(constants.clientEvents.LIST_ITEM_UPDATED, data.d.listItem, existingItem ?? null);
    }
    listItemDeleted(data: WSListItemDeleted) {
        const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
        if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
        return this.client.emit(constants.clientEvents.LIST_ITEM_DELETED, data.d.listItem);
    }
}
