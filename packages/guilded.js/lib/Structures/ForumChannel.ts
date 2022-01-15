import Collection from "@discordjs/collection";
import { CreateForumThreadOptions } from "@guildedjs/rest";
import Client from "../Client";
import Base from "./Base";

export interface ForumChannelPayload {
    id: string;
}

export interface ForumThread {}

export default class ForumChannel extends Base {
    /** The id of the channel. */
    id: string;
    /** The threads in this channel. */
    threads = new Collection<string, ForumThread>();

    constructor(client: Client, payload: ForumChannelPayload) {
        super(client);

        this.id = payload.id;
    }

    /** Create a thread in a forum */
    createThread(options: CreateForumThreadOptions) {
        return this.client.createForumThread(this.id, options);
    }
}
