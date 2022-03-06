import { RESTPostListItemBody } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class ListManager extends GlobalManager {
    /** Create a list item. */
    createItem(channelId: string, options: RESTPostListItemBody) {
        return this.client.rest.router.createListItem(channelId, options);
    }
}
