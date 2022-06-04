import type { ServerPayload } from "../structs/Server";

/**
 * GET
 * /servers/:serverId
 */
export interface RESTGetServerResult {
    server: ServerPayload;
}
