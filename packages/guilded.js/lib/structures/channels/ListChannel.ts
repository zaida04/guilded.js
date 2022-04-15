import Collection from "@discordjs/collection";
import type { ListItemPayload } from "@guildedjs/guilded-api-typings";
import { Base } from "../Base";

export class ListChannel extends Base {
    /** The items in this channel. */
    readonly items = new Collection<string, ListItemPayload>();

    /** Create a list item. */
    createItem(message: string, note?: string): Promise<ListItemPayload> {
        return this.client.lists.create(this.id, { message, note });
    }
}
