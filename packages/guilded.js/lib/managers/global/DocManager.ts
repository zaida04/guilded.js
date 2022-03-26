import type { RESTPostDocsBody, RESTPutDocBody } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class GlobalDocManager extends GlobalManager {
    /** Create a doc. */
    create(channelId: string, options: RESTPostDocsBody) {
        return this.client.rest.router.createDoc(channelId, options);
    }

    /** Get the docs from a channel. */
    fetchMany(channelId: string) {
        return this.client.rest.router.getDocs(channelId);
    }

    /** Get a doc from a channel. */
    fetch(channelId: string, docId: number) {
        return this.client.rest.router.getDoc(channelId, docId);
    }

    /** Update a doc */
    update(channelId: string, docId: number, options: RESTPutDocBody) {
        return this.client.rest.router.updateDoc(channelId, docId, options);
    }

    /** Delete a doc from a channel. */
    delete(channelId: string, docId: number) {
        return this.client.rest.router.deleteDoc(channelId, docId);
    }
}
