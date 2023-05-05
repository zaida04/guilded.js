import { Collection } from "@discordjs/collection";
import { Channel } from "./Channel";
import { Schema } from "@guildedjs/guilded-api-typings";

/**
 * Represents a list channel in Guilded.
 * @extends Channel
 */
export class ListChannel extends Channel {
  /**
   * The list items in this channel.
   */
  readonly items = new Collection<
    string,
    Schema<"ListItem"> | Schema<"ListItemSummary">
  >();

  /**
   * Creates a list item in this channel.
   * @param message - The message of the new list item.
   * @param note - Optional note for the new list item.
   * @returns A Promise that resolves with the newly created list item payload.
   */
  createItem(message: string, note?: string): Promise<Schema<"ListItem">> {
    return this.client.lists.create(this.id, {
      message,
      note: note ? { content: note } : undefined,
    });
  }

  /**
   * Fetches a list item by its ID.
   * @param itemId - The ID of the list item to fetch.
   * @returns A Promise that resolves with the list item payload.
   */
  getItem(itemId: string): Promise<Schema<"ListItem">> {
    return this.client.lists.fetch(this.id, itemId).then((data) => {
      this.items.set(data.id, data);
      return data;
    });
  }

  /**
   * Fetches all list items in this channel.
   * @returns A Promise that resolves with an array of list item summary payloads.
   */
  getItems(): Promise<Schema<"ListItemSummary">[]> {
    return this.client.lists.fetchMany(this.id).then((data) => {
      for (const item of data) {
        this.items.set(item.id, item);
      }
      return data;
    });
  }

  /**
   * Completes a list item.
   * @param itemId - The ID of the list item to complete.
   * @returns A Promise that resolves when the list item is completed.
   */
  completeItem(itemId: string): Promise<void> {
    return this.client.lists.complete(this.id, itemId).then(() => void 0);
  }

  /**
   * Uncompletes a list item.
   * @param itemId - The ID of the list item to uncomplete.
   * @returns A Promise that resolves when the list item is uncompleted.
   */
  uncompleteItem(itemId: string): Promise<void> {
    return this.client.lists.uncomplete(this.id, itemId).then(() => void 0);
  }
}
