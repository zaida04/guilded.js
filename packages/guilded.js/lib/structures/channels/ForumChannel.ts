import Collection from "@discordjs/collection";
import type { ForumThreadPayload } from "@guildedjs/guilded-api-typings";
import { Base } from "../Base";

export default class ForumChannel extends Base {
    /** The threads in this channel. */
    readonly threads = new Collection<string, ForumThreadPayload>();

    /** Create a thread in a forum */
    createThread(title: string, content: string): Promise<ForumThreadPayload> {
        return this.client.forums.createThread(this.id, { title, content });
    }
}
