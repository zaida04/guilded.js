import Collection from "@discordjs/collection";
import { CreateListItemOptions } from "@guildedjs/rest";
import Client from "../Client";
import Base from "./Base";

export interface ListChannelPayload {
    id: string;
}
export interface ListItem {}

export default class ListChannel extends Base {
    /** The id of the channel. */
    id: string;
    /** The items in this channel. */
    items = new Collection<string, ListItem>();

    constructor(client: Client, payload: ListChannelPayload) {
        super(client);

        this.id = payload.id;
    }

    /** Create a list item. */
    createItem(options: CreateListItemOptions) {
        return this.client.createListItem(this.id, options);
    }
}
