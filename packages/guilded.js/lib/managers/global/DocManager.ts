import type { DocPayload, RESTPostDocsBody, RESTPutDocBody } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class GlobalDocManager extends GlobalManager {
    /** Create a doc. */
    create(channelId: string, options: RESTPostDocsBody): Promise<DocPayload> {
        return this.client.rest.router.createDoc(channelId, options).then((data) => data.doc);
    }

    /** Get the docs from a channel. */
    fetchMany(channelId: string): Promise<DocPayload[]> {
        return this.client.rest.router.getDocs(channelId).then((data) => data.docs);
    }

    /** Get a doc from a channel. */
    fetch(channelId: string, docId: number): Promise<DocPayload> {
        return this.client.rest.router.getDoc(channelId, docId).then((data) => data.doc);
    }

    /** Update a doc */
    update(channelId: string, docId: number, options: RESTPutDocBody): Promise<DocPayload> {
        return this.client.rest.router.updateDoc(channelId, docId, options).then((data) => data.doc);
    }

    /** Delete a doc from a channel. */
    delete(channelId: string, docId: number): Promise<void> {
        return this.client.rest.router.deleteDoc(channelId, docId).then(() => void 0);
    }
}
