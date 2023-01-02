import type { DocPayload } from "../structs/Doc";

/**
 * POST
 * /channels/:channelId/docs
 */
export type RESTPostDocsResult = {
    doc: DocPayload;
}
export type RESTPostDocsBody = {
    content: string;
    title: string;
}

/**
 * GET
 * /channels/:channelId/docs
 */
export type RESTGetDocsResult = {
    docs: DocPayload[];
}

/**
 * GET
 * /channels/:channelId/docs/:docId
 */
export type RESTGetDocResult = {
    doc: DocPayload;
}

/**
 * PUT
 * /channels/:channelId/docs/:docId
 */
export type RESTPutDocResult = {
    doc: DocPayload;
}
export type RESTPutDocBody = {
    content: string;
    title: string;
}

/**
 * DELETE
 * /channels/:channelId/docs/:docId
 */
export type RESTDeleteDocResult = never;
