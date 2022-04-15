import Collection from "@discordjs/collection";
import type { DocPayload, RESTPostDocsBody, RESTPutDocBody } from "@guildedjs/guilded-api-typings";
import { Base } from "../Base";

export interface Doc {}

export class DocChannel extends Base {
    /** The docs in this channel. */
    readonly docs = new Collection<string, Doc>();

    /** Create a doc. */
    createDoc(options: RESTPostDocsBody): Promise<DocPayload> {
        return this.client.docs.create(this.id, options);
    }

    /** Get the docs from this channel. */
    getDocs(): Promise<DocPayload[]> {
        return this.client.docs.fetchMany(this.id);
    }

    /** Get a doc from this channel. */
    getDoc(docId: number): Promise<DocPayload> {
        return this.client.docs.fetch(this.id, docId);
    }

    /** Update a doc in this channel. */
    updateDoc(docId: number, options: RESTPutDocBody): Promise<DocPayload> {
        return this.client.docs.update(this.id, docId, options);
    }

    /** Delete a doc from this channel. */
    deleteDoc(docId: number): Promise<void> {
        return this.client.docs.delete(this.id, docId);
    }
}
