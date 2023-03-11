import type {
  DocPayload,
  RESTPostDocsBody,
  RESTPutDocBody,
} from "@guildedjs/guilded-api-typings";
import { GlobalManager } from "./GlobalManager";

/**
 * A manager class for Docs
 */
export class GlobalDocManager extends GlobalManager {
  /**
   * Create a new Doc.
   * @param channelId - The ID of the channel where the Doc should be created.
   * @param options - The options for the Doc to be created.
   * @returns A Promise that resolves with the Doc payload of the newly created Doc.
   */
  create(channelId: string, options: RESTPostDocsBody): Promise<DocPayload> {
    return this.client.rest.router
      .createDoc(channelId, options)
      .then((data) => data.doc);
  }

  /**
   * Fetches multiple Docs from a channel.
   * @param channelId - The ID of the channel where the Docs are located.
   * @returns A Promise that resolves with an array of Doc payloads.
   */
  fetchMany(channelId: string): Promise<DocPayload[]> {
    return this.client.rest.router.getDocs(channelId).then((data) => data.docs);
  }

  /**
   * Fetch a Doc from a channel.
   * @param channelId - The ID of the channel where the Doc is located.
   * @param docId - The ID of the Doc to fetch.
   * @returns A Promise that resolves with the Doc payload of the fetched Doc.
   */
  fetch(channelId: string, docId: number): Promise<DocPayload> {
    return this.client.rest.router
      .getDoc(channelId, docId)
      .then((data) => data.doc);
  }

  /**
   * Update a Doc.
   * @param channelId - The ID of the channel where the Doc is located.
   * @param docId - The ID of the Doc to update.
   * @param options - The options for the Doc update.
   * @returns A Promise that resolves with the Doc payload of the updated Doc.
   */
  update(
    channelId: string,
    docId: number,
    options: RESTPutDocBody
  ): Promise<DocPayload> {
    return this.client.rest.router
      .updateDoc(channelId, docId, options)
      .then((data) => data.doc);
  }

  /**
   * Delete a Doc from a channel.
   * @param channelId - The ID of the channel where the Doc is located.
   * @param docId - The ID of the Doc to delete.
   * @returns A Promise that resolves with void when the Doc is successfully deleted.
   */
  delete(channelId: string, docId: number): Promise<void> {
    return this.client.rest.router
      .deleteDoc(channelId, docId)
      .then(() => void 0);
  }
}
