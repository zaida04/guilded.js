import Collection from "@discordjs/collection";
import { CreateDocOptions, UpdateDocOptions } from "@guildedjs/rest";
import Client from "../Client";
import { Base } from "./Base";

export interface DocChannelPayload {
    id: string;
}

export interface Doc {}

export default class DocChannel extends Base {
    /** The id of the channel. */
    id: string;
    /** The docs in this channel. */
    docs = new Collection<string, Doc>();

    constructor(client: Client, payload: DocChannelPayload) {
        super(client);

        this.id = payload.id;
    }

    /** Create a doc. */
    createDoc(options: CreateDocOptions) {
        return this.client.createDoc(this.id, options);
    }

    /** Get the docs from this channel. */
    getDocs() {
        return this.client.getDocs(this.id);
    }

    /** Get a doc from this channel. */
    getDoc(docId: number) {
        return this.client.getDoc(this.id, docId);
    }

    /** Update a doc in this channel. */
    updateDoc(docId: number, options: UpdateDocOptions) {
        return this.client.updateDoc(this.id, docId, options);
    }

    /** Delete a doc from this channel. */
    deleteDoc(docId: number) {
        return this.client.deleteDoc(this.id, docId);
    }
}
