import Collection from "@discordjs/collection";
import Base from "../Base";

export interface ForumThread {}

export default class ForumChannel extends Base {
    /** The threads in this channel. */
    threads = new Collection<string, ForumThread>();

    /** Create a thread in a forum */
    createThread(title: string, content: string) {
        return this.client.forums.createThread(this.id, { title, content });
    }
}
