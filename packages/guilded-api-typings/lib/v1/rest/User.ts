import type { UserPayload } from "../structs";

/**
 * GET
 * /users/:userId
 */
export type RESTGetUserResult = {
  user: UserPayload;
};
