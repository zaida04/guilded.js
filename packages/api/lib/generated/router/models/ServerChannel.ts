/* istanbul ignore file */
/* eslint-disable */

export type ServerChannel = {
  /**
   * The ID of the channel
   */
  id: string;
  /**
   * The type of channel. This will determine what routes to use for creating content in a channel. For example, if this "chat", then one must use the routes for creating channel messages
   */
  type:
    | "announcements"
    | "chat"
    | "calendar"
    | "forums"
    | "media"
    | "docs"
    | "voice"
    | "list"
    | "scheduling"
    | "stream";
  /**
   * The name of the channel
   */
  name: string;
  /**
   * The topic of the channel. Not applicable to threads
   */
  topic?: string;
  /**
   * The ISO 8601 timestamp that the channel was created at
   */
  createdAt: string;
  /**
   * The ID of the user who created this channel
   */
  createdBy: string;
  /**
   * The ISO 8601 timestamp that the channel was updated at, if relevant
   */
  updatedAt?: string;
  /**
   * The ID of the server
   */
  serverId: string;
  /**
   * ID of the **root** channel or thread in the channel hierarchy. Only applicable to "chat", "voice", and "stream" channels and indicates that this channel is a thread, if present
   */
  rootId?: string;
  /**
   * ID of the **immediate** parent channel or thread in the channel hierarchy. Only applicable to "chat", "voice", and "stream" channels and indicates that this channel is a thread, if present
   */
  parentId?: string;
  /**
   * The ID of the message that this channel was created off of. Only applicable to "chat", "voice", and "stream" channels and indicates that this channel is a thread, if present
   */
  messageId?: string;
  /**
   * The category that the channel exists in. Only relevant for server channels
   */
  categoryId?: number;
  /**
   * The ID of the group
   */
  groupId: string;
  /**
   * Whether the channel can be accessed from users who are not member of the server. Not applicable to threads
   */
  isPublic?: boolean;
  /**
   * The ID of the user who archived this channel
   */
  archivedBy?: string;
  /**
   * The ISO 8601 timestamp that the channel was archived at, if relevant
   */
  archivedAt?: string;
};
