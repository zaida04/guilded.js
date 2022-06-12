import type { ForumTopicPayload, RESTPostForumTopicBody } from "@guildedjs/guilded-api-typings";
import { GlobalManager } from "./GlobalManager";

export class GlobalForumManager extends GlobalManager {
    /** Create a topic in a forum */
    createTopic(channelId: string, options: RESTPostForumTopicBody): Promise<ForumTopicPayload> {
        return this.client.rest.router.createForumTopic(channelId, options).then((data) => data.forumTopic);
    }
}
