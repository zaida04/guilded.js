import type { RESTPostListItemBody } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class GlobalListManager extends GlobalManager {
    /** Create a list item. */
    createItem(channelId: string, options: RESTPostListItemBody) {
        return this.client.rest.router.createListItem(channelId, options);
    }
}
