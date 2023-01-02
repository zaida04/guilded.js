import type { ServerMemberBanPayload, ServerMemberPayload, ServerMemberSummaryPayload } from "../structs";

/**
 * PUT
 * /servers/:serverId/members/:userId/nickname
 */
export type RESTPutMemberNicknameResult = {
    nickname: string;
}
export type RESTPutMemberNicknameBody = {
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
export type RESTGetMemberResult = {
    member: ServerMemberPayload;
}

/**
 * GET
 * /servers/:serverId/members
 */
export type RESTGetMembersResult = {
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
export type RESTGetMemberBanResult = {
    serverMemberBan: ServerMemberBanPayload;
}

/**
 * POST
 * /servers/:serverId/bans/:userId
 */
export type RESTPostMemberBanBody = {
    reason?: string;
}
export type RESTPostMemberBanResult = {
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
export type RESTGetMemberBansResult = {
    serverMemberBans: ServerMemberBanPayload[];
}
