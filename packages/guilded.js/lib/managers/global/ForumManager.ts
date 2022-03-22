import type { RESTPostForumThreadBody } from "@guildedjs/guilded-api-typings";
import GlobalManager from "./GlobalManager";

export default class GlobalForumManager extends GlobalManager {
    /** Create a thread in a forum */
    createThread(channelId: string, options: RESTPostForumThreadBody) {
        return this.client.rest.router.createForumThread(channelId, options);
    }
}
