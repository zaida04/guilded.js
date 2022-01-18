import { ListItemPayload } from "../structs/List";

/**
 * POST
 * /channels/:channelId/list
 */
export interface RESTPostListItemBody {
    message: string;
    note?: string;
}
export interface RESTPostListItemResult {
    listItem: ListItemPayload;
}
