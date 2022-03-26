import type { RESTPostListItemBody, RESTPutListItemBody } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class GlobalListManager extends GlobalManager {
    /** Create a list item. */
    create(channelId: string, options: RESTPostListItemBody) {
        return this.client.rest.router.createListItem(channelId, options);
    }

    /** Get list items */
    fetchMany(channelId: string) {
        return this.client.rest.router.getListItems(channelId);
    }

    /** Get list item */
    fetch(channelId: string, itemId: string) {
        return this.client.rest.router.getListItem(channelId, itemId);
    }

    /** Update list item */
    update(channelId: string, itemId: string, options: RESTPutListItemBody) {
        return this.client.rest.router.updateListItem(channelId, itemId, options);
    }

    /** Delete list item */
    delete(channelId: string, itemId: string) {
        return this.client.rest.router.deleteListItem(channelId, itemId)
    }
}
