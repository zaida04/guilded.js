import Collection from "@discordjs/collection";
import Base from "../Base";

export interface ListItem {}

export default class ListChannel extends Base {
    /** The items in this channel. */
    items = new Collection<string, ListItem>();

    /** Create a list item. */
    createItem(message: string, note?: string) {
        return this.client.lists.createItem(this.id, { message, note });
    }
}
