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
    ListItemCompleted(data: WSListItemCompleted) {
        const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
        if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
        return this.client.emit(constants.clientEvents.LIST_ITEM_COMPLETED, data.d.listItem);
    }
    ListItemUncompleted(data: WSListItemUncompleted) {
        const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
        if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
        return this.client.emit(constants.clientEvents.LIST_ITEM_UNCOMPLETED, data.d.listItem);
    }
    ListItemCreated(data: WSListItemCreated) {
        const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
        if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
        return this.client.emit(constants.clientEvents.LIST_ITEM_CREATED, data.d.listItem);
    }
    ListItemUpdated(data: WSListItemUpdated) {
        const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
        const existingItem = existingChannel?.items.get(data.d.listItem.id);
        if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
        return this.client.emit(constants.clientEvents.LIST_ITEM_UPDATED, data.d.listItem, existingItem ?? null);
    }
    ListItemDeleted(data: WSListItemDeleted) {
        const existingChannel = this.client.channels.cache.get(data.d.listItem.channelId) as ListChannel | undefined;
        if (existingChannel) existingChannel.items.set(data.d.listItem.id, data.d.listItem);
        return this.client.emit(constants.clientEvents.LIST_ITEM_DELETED, data.d.listItem);
    }
}
