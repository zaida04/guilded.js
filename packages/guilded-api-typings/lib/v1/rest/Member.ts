import type { TeamMemberBanPayload, TeamMemberPayload, TeamMemberSummaryPayload } from "../structs";

/**
 * GET
 * /servers/:serverId/members/:userId/roles
 */
export interface RESTGetMemberRolesResult {
    roleIds: number[];
}

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
    member: TeamMemberPayload;
}

/**
 * GET
 * /servers/:serverId/members
 */
export interface RESTGetMembersResult {
    members: TeamMemberSummaryPayload[];
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
    serverMemberBan: TeamMemberBanPayload;
}

/**
 * POST
 * /servers/:serverId/bans/:userId
 */
export interface RESTPostMemberBanBody {
    reason?: string;
}
export interface RESTPostMemberBanResult {
    serverMemberBan: TeamMemberBanPayload;
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
    serverMemberBans: TeamMemberBanPayload[];
}
