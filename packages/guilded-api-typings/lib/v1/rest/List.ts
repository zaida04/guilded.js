import type { ListItemPayload, ListItemSummaryPayload } from "../structs/List";

/**
 * GET
 * /channels/:channelId/items
 */
export type RESTGetListItemsResult = {
    listItems: ListItemSummaryPayload[];
}

/**
 * GET
 * /channels/:channelId/items/:listItemId
 */
export type RESTGetListItemResult = {
    listItem: ListItemPayload;
}

/**
 * PUT
 * /channels/:channelId/items/:listItemId
 */
export type RESTPutListItemBody = {
    message: string;
    note?: string;
}
export type RESTPutListItemResult = {
    listItem: ListItemPayload;
}

/**
 * DELETE
 * /channels/:channelId/items/:listItemId
 */
export type RESTDeleteListItemResult = never;

/**
 * POST
 * /channels/:channelId/items
 */
export type RESTPostListItemBody = {
    message: string;
    note?: string;
}
export type RESTPostListItemResult = {
    listItem: ListItemPayload;
}

/**
 * POST
 * /channels/:channelId/items/:listItemId/complete
 */
export type RESTPostListItemCompleteResult = never;

/**
 * DELETE
 * /channels/:channelId/items/:listItemId/complete
 */
export type RESTDeleteListItemCompleteResult = never;
