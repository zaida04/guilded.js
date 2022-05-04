import Collection from "@discordjs/collection";
import type { ListItemPayload, ListItemSummaryPayload } from "@guildedjs/guilded-api-typings";
import { Channel } from "./Channel";

export class ListChannel extends Channel {
    /** The items in this channel. */
    readonly items = new Collection<string, ListItemPayload | ListItemSummaryPayload>();

    /** Create a list item. */
    createItem(message: string, note?: string): Promise<ListItemPayload> {
        return this.client.lists.create(this.id, { message, note });
    }

    getItem(itemId: string): Promise<ListItemPayload> {
        return this.client.lists.fetch(this.id, itemId).then((data) => {
            this.items.set(data.id, data);
            return data;
        });
    }

    getItems(): Promise<ListItemSummaryPayload[]> {
        return this.client.lists.fetchMany(this.id).then((data) => {
            for (const item of data) {
                this.items.set(item.id, item);
            }
            return data;
        });
    }

    completeItem(itemId: string): Promise<void> {
        return this.client.lists.complete(this.id, itemId).then(() => void 0);
    }

    uncompletedItem(itemId: string): Promise<void> {
        return this.client.lists.uncomplete(this.id, itemId).then(() => void 0);
    }
}
