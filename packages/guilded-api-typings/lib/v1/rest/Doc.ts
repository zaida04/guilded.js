import { DocPayload } from "../structs/Doc";

/**
 * POST
 * /channels/:channelId/docs
 */
export interface RESTPostDocsResult {
    doc: DocPayload;
}
export interface RESTPostDocsBody {
    title: string;
    content: string;
}

/**
 * GET
 * /channels/:channelId/docs
 */
export interface RESTGetDocsResult {
    docs: DocPayload[];
}

/**
 * GET
 * /channels/:channelId/docs/:docId
 */
export interface RESTGetDocResult {
    doc: DocPayload;
}

/**
 * PUT
 * /channels/:channelId/docs/:docId
 */
export interface RESTPutDocResult {
    doc: DocPayload;
}
export interface RESTPutDocBody {
    title: string;
    content: string;
}

/**
 * DELETE
 * /channels/:channelId/docs/:docId
 */
export type RESTDeleteDocResult = never;
