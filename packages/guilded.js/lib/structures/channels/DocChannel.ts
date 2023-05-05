import { Collection } from "@discordjs/collection";
import { Channel } from "./Channel";
import { RestBody, RestPath, Schema } from "@guildedjs/guilded-api-typings";

/**
 * Represents a doc channel on Guilded
 * @extends Channel
 */
export class DocChannel extends Channel {
  /**
   * The docs in this channel.
   */
  readonly docs = new Collection<number, Schema<"Doc">>();

  /**
   * Create a new doc in this channel.
   * @param options - The options for creating the doc.
   * @returns A promise that resolves with the created doc.
   */
  createDoc(
    options: RestBody<RestPath<"/channels/{channelId}/docs">["post"]>
  ): Promise<Schema<"Doc">> {
    return this.client.docs.create(this.id, options);
  }

  /**
   * Get all the docs from this channel.
   * @returns A promise that resolves with an array of all docs.
   */
  getDocs(): Promise<Schema<"Doc">[]> {
    return this.client.docs.fetchMany(this.id);
  }

  /**
   * Get a specific doc from this channel.
   * @param docId - The ID ofSchema<"Doc"> the doc to fetch.
   * @returns A promise that resolves with the fetched doc.
   */
  getDoc(docId: number): Promise<Schema<"Doc">> {
    return this.client.docs.fetch(this.id, docId);
  }

  /**
   * Update a specific doc in this channel.
   * @param docId - The ID of the doc to update.
   * @param options - The options for updating the doc.
   * @returns A promise that resolves with the updated doc.
   */
  updateDoc(
    docId: number,
    options: RestBody<RestPath<"/channels/{channelId}/docs/{docId}">["put"]>
  ): Promise<Schema<"Doc">> {
    return this.client.docs.update(this.id, docId, options);
  }

  /**
   * Delete a specific doc from this channel.
   * @param docId - The ID of the doc to delete.
   * @returns A promise that resolves with no data.
   */
  deleteDoc(docId: number): Promise<void> {
    return this.client.docs.delete(this.id, docId);
  }
}
