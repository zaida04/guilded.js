import type { ListItemPayload, ListItemSummaryPayload, RESTPostListItemBody, RESTPutListItemBody } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class GlobalListManager extends GlobalManager {
    /** Create a list item. */
    create(channelId: string, options: RESTPostListItemBody): Promise<ListItemPayload> {
        return this.client.rest.router.createListItem(channelId, options).then((data) => data.listItem);
    }

    /** Get list items */
    fetchMany(channelId: string): Promise<ListItemSummaryPayload[]> {
        return this.client.rest.router.getListItems(channelId).then((data) => data.listItems);
    }

    /** Get list item */
    fetch(channelId: string, itemId: string): Promise<ListItemPayload> {
        return this.client.rest.router.getListItem(channelId, itemId).then((data) => data.listItem);
    }

    /** Update list item */
    update(channelId: string, itemId: string, options: RESTPutListItemBody): Promise<ListItemPayload> {
        return this.client.rest.router.updateListItem(channelId, itemId, options).then((data) => data.listItem);
    }

    /** Delete list item */
    delete(channelId: string, itemId: string): Promise<void> {
        return this.client.rest.router.deleteListItem(channelId, itemId).then(() => void 0);
    }
}
