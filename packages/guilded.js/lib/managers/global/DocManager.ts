import { RESTPostDocsBody, RESTPutDocBody } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class DocManager extends GlobalManager {
    /** Create a doc. */
    createDoc(channelId: string, options: RESTPostDocsBody) {
        return this.client.rest.router.createDoc(channelId, options);
    }

    /** Get the docs from a channel. */
    getDocs(channelId: string) {
        return this.client.rest.router.getDocs(channelId);
    }

    /** Get a doc from a channel. */
    getDoc(channelId: string, docId: number) {
        return this.client.rest.router.getDoc(channelId, docId);
    }

    /** Update a doc */
    updateDoc(channelId: string, docId: number, options: RESTPutDocBody) {
        return this.client.rest.router.updateDoc(channelId, docId, options);
    }

    /** Delete a doc from a channel. */
    deleteDoc(channelId: string, docId: number) {
        return this.client.rest.router.deleteDoc(channelId, docId);
    }
}