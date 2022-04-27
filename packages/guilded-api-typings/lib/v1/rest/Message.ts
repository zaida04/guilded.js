import type { ChatMessagePayload, EmbedPayload } from "../structs/Message";

/**
 * POST
 * /channels/:channelId/messages
 */
export interface RESTPostChannelMessagesResult {
    message: ChatMessagePayload;
}
export type RESTPostChannelMessagesBody = Pick<ChatMessagePayload, "isPrivate" | "replyMessageIds" | "content" | "embeds"> & { isSilent?: boolean };
/**
 * GET
 * /channels/:channelId/messages
 */
export interface RESTGetChannelMessagesResult {
    messages: ChatMessagePayload[];
}
export interface RESTGetChannelMessagesQuery {
    before?: string;
    after?: string;
    limit?: number;
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
    /** The embeds to update to. */
    embeds?: EmbedPayload[];
}

/**
 * DELETE
 * /channels/:channelId/messages/:messageId
 */
export type RESTDeleteChannelMessageResult = never;
