import type { ChatMessagePayload } from "../structs/Message";

/**
 * POST
 * /channels/:channelId/messages
 */
export type RESTPostChannelMessagesResult = {
    message: ChatMessagePayload;
}
export type RESTPostChannelMessagesBody = Pick<ChatMessagePayload, "embeds" | "isPrivate" | "isSilent" | "replyMessageIds"> & {
    content?: string;
};
/**
 * GET
 * /channels/:channelId/messages
 */
export type RESTGetChannelMessagesResult = {
    messages: ChatMessagePayload[];
}
export type RESTGetChannelMessagesQuery = {
    /**
     * Uses ISO8601 timestamp
     */
    after?: string;
    /**
     * Uses ISO8601 timestamp
     */
    before?: string;
    includePrivate?: boolean;
    limit?: number;
}

/**
 * GET
 * /channels/:channelId/messages/:messageId
 */
export type RESTGetChannelMessageResult = {
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
