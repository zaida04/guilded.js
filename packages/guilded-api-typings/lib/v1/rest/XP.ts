/**
 * POST
 * /servers/:serverId/members/:userId/xp
 */
export type RESTPostUserXpResult = {
    total: number;
}
export type RESTPostUserXPBody = {
    amount: number;
}

/**
 * POST
 * /servers/:serverId/roles/:roleId/xp
 */
export type RESTPostRoleXpResult = {
    total: number;
}
export type RESTPostRoleXPBody = {
    amount: number;
}
