import type { ChatMessagePayload } from "../structs/Message";

/**
 * POST
 * /channels/:channelId/messages
 */
export interface RESTPostChannelMessagesResult {
    message: ChatMessagePayload;
}
export type RESTPostChannelMessagesBody = Pick<ChatMessagePayload, "isPrivate" | "replyMessageIds" | "embeds" | "isSilent"> & {
    content?: string;
};
/**
 * GET
 * /channels/:channelId/messages
 */
export interface RESTGetChannelMessagesResult {
    messages: ChatMessagePayload[];
}
export interface RESTGetChannelMessagesQuery {
    /** Uses ISO8601 timestamp **\
    before?: string;
    /** Uses ISO8601 timestamp **\
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
export type RESTPutChannelMessageBody = Pick<ChatMessagePayload, "embeds"> & { content?: string };

/**
 * DELETE
 * /channels/:channelId/messages/:messageId
 */
export type RESTDeleteChannelMessageResult = never;
