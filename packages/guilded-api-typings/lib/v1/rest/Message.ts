import type { ChatMessagePayload } from "../structs/Message";

/**
 * POST
 * /channels/:channelId/messages
 */
export interface RESTPostChannelMessagesResult {
    message: ChatMessagePayload;
}
export interface RESTPostChannelMessagesBody {
    /** Whether the message can only be seen by those mentioned or replied to */
    isPrivate?: boolean;
    /** If set, this message will not notify any mentioned users or roles. */
    isSilent?: boolean;
    /** The id(s) of the messages this message is a reply to */
    replyMessageIds?: string[];
    /** The message content. */
    content: string;
}

/**
 * GET
 * /channels/:channelId/messages
 */
export interface RESTGetChannelMessagesResult {
    messages: ChatMessagePayload[];
}
export interface RESTGetChannelMessagesQuery {
    includePrivate?: boolean;
}

/**
 * GET
 * /channels/:channelId/messages/:messageId
 */
export interface RESTGetChannelMessageResult {
    message: ChatMessagePayload;
}

/**
 * PUT
 * /channels/:channelId/messages/:messageId
 */
export type RESTPutChannelMessageResult = RESTGetChannelMessageResult;
export interface RESTPutChannelMessageBody {
    /** Message content to update to. */
    content: string;
}

/**
 * DELETE
 * /channels/:channelId/messages/:messageId
 */
export type RESTDeleteChannelMessageResult = never;
