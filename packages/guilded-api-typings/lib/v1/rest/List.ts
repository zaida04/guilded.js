import { ListItemPayload, ListItemSummaryPayload } from "../structs/List";

/**
 * GET
 * /channels/:channelId/items
 */
export interface RESTGetListItemsResult {
    listItem: ListItemSummaryPayload[];
}

/**
 * GET
 * /channels/:channelId/items/:listItemId
 */
export interface RESTGetListItemResult {
    listItem: ListItemSummaryPayload;
}

/**
 * PUT
 * /channels/:channelId/items/:listItemId
 */
export interface RESTPutListItemBody {
    message: string;
    note?: string;
}
export interface RESTPutListItemResult {
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
export interface RESTPostListItemBody {
    message: string;
    note?: string;
}
export interface RESTPostListItemResult {
    listItem: ListItemPayload;
}
