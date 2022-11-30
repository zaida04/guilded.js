import type { ServerPayload } from "../structs/Server";

/**
 * GET
 * /servers/:serverId
 */
export type RESTGetServerResult = {
    server: ServerPayload;
}
