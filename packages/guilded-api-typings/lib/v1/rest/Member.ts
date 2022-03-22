import { TeamMemberPayload, TeamMemberSummary } from "../structs";

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
    members: TeamMemberSummary[];
}

/**
 * DELETE
 * /servers/:serverId/members/:userId
 */
export type RESTDeleteMemberResult = never;
