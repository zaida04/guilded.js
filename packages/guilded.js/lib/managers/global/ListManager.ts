import type { ListItemPayload, ListItemSummaryPayload, ListItemsService } from "@guildedjs/api";
import type { OptionBody } from "../../typings";
import { GlobalManager } from "./GlobalManager";

/**
 * A class representing a manager for list items at a global level.
 */
export class GlobalListItemManager extends GlobalManager {
    /**
     * Creates a new list item.
     *
     * @param channelId The ID of the channel to create the list item in.
     * @param options Additional options for the list item.
     * @returns A Promise that resolves with the newly created list item.
     */
    create(channelId: string, options: OptionBody<ListItemsService["listItemCreate"]>): Promise<ListItemPayload> {
        return this.client.rest.router.listItems.listItemCreate({ channelId, requestBody: options }).then((data) => data.listItem);
    }

    /**
     * Fetches multiple list items.
     *
     * @param channelId The ID of the channel to fetch the list items from.
     * @returns A Promise that resolves with an array of list item summaries.
     */
    fetchMany(channelId: string): Promise<ListItemSummaryPayload[]> {
        return this.client.rest.router.listItems.listItemReadMany({ channelId }).then((data) => data.listItems);
    }

    /**
     * Fetches a single list item.
     *
     * @param channelId The ID of the channel that the list item belongs to.
     * @param listItemId The ID of the list item to fetch.
     * @returns A Promise that resolves with the requested list item.
     */
    fetch(channelId: string, listItemId: string): Promise<ListItemPayload> {
        return this.client.rest.router.listItems.listItemRead({ channelId, listItemId }).then((data) => data.listItem);
    }

    /**
     * Updates a list item.
     *
     * @param channelId The ID of the channel that the list item belongs to.
     * @param listItemId The ID of the list item to update.
     * @param options Additional options for the updated list item.
     * @returns A Promise that resolves with the updated list item.
     */
    update(channelId: string, listItemId: string, options: OptionBody<ListItemsService["listItemUpdate"]>): Promise<ListItemPayload> {
        return this.client.rest.router.listItems.listItemUpdate({ channelId, listItemId, requestBody: options }).then((data) => data.listItem);
    }

    /**
     * Deletes a list item.
     *
     * @param channelId The ID of the channel that the list item belongs to.
     * @param listItemId The ID of the list item to delete.
     * @returns A Promise that resolves with no value upon successful deletion.
     */
    delete(channelId: string, listItemId: string): Promise<void> {
        return this.client.rest.router.listItems.listItemDelete({ channelId, listItemId }).then(() => void 0);
    }

    /**
     * Marks a list item as complete.
     *
     * @param channelId The ID of the channel that the list item belongs to.
     * @param listItemId The ID of the list item to mark as complete.
     * @returns A Promise that resolves with no value upon successful completion.
     */
    complete(channelId: string, listItemId: string): Promise<void> {
        return this.client.rest.router.listItems.listItemCompleteCreate({ channelId, listItemId }).then(() => void 0);
    }

    /**
     * Marks a completed list item as incomplete.
     *
     * @param channelId The ID of the channel that the list item belongs to.
     * @param listItemId The ID of the completed list item to mark as incomplete.
     * @returns A Promise that resolves with no value upon successful uncompletion.
     */
    uncomplete(channelId: string, listItemId: string): Promise<void> {
        return this.client.rest.router.listItems.listItemCompleteDelete({ channelId, listItemId }).then(() => void 0);
    }
}
