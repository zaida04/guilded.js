import type { ServerMemberBanPayload, ServerMemberPayload, ServerMemberSummaryPayload } from "../structs";

/**
 * PUT
 * /servers/:serverId/members/:userId/nickname
 */
export interface RESTPutMemberNicknameResult {
    nickname: string;
}
export interface RESTPutMemberNicknameBody {
    nickname: string;
}

/**
 * DELETE
 * /servers/:serverId/members/:userId/nickname
 */
export type RESTDeleteMemberNicknameResult = never;

/**
 * GET
 * /servers/:serverId/members/:userId
 */
export interface RESTGetMemberResult {
    member: ServerMemberPayload;
}

/**
 * GET
 * /servers/:serverId/members
 */
export interface RESTGetMembersResult {
    members: ServerMemberSummaryPayload[];
}

/**
 * DELETE
 * /servers/:serverId/members/:userId
 */
export type RESTDeleteMemberResult = never;

/**
 * GET
 * /servers/:serverId/bans/:userId
 */
export interface RESTGetMemberBanResult {
    serverMemberBan: ServerMemberBanPayload;
}

/**
 * POST
 * /servers/:serverId/bans/:userId
 */
export interface RESTPostMemberBanBody {
    reason?: string;
}
export interface RESTPostMemberBanResult {
    serverMemberBan: ServerMemberBanPayload;
}

/**
 * DELETE
 * /servers/:serverId/bans/:userId
 */
export type RESTDeleteMemberBanResult = never;

/**
 * GET
 * /servers/:serverId/bans
 */
export interface RESTGetMemberBansResult {
    serverMemberBans: ServerMemberBanPayload[];
}
