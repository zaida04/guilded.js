import Collection from "@discordjs/collection";
import { RESTPostDocsBody, RESTPutDocBody } from "@guildedjs/guilded-api-typings";
import Base from "../Base";

export interface Doc {}

export default class DocChannel extends Base {
    /** The docs in this channel. */
    docs = new Collection<string, Doc>();

    /** Create a doc. */
    createDoc(options: RESTPostDocsBody) {
        return this.client.docs.createDoc(this.id, options);
    }

    /** Get the docs from this channel. */
    getDocs() {
        return this.client.docs.getDocs(this.id);
    }

    /** Get a doc from this channel. */
    getDoc(docId: number) {
        return this.client.docs.getDoc(this.id, docId);
    }

    /** Update a doc in this channel. */
    updateDoc(docId: number, title: string, content: string) {
        return this.client.docs.updateDoc(this.id, docId, { title, content });
    }

    /** Delete a doc from this channel. */
    deleteDoc(docId: number) {
        return this.client.docs.deleteDoc(this.id, docId);
    }
}
