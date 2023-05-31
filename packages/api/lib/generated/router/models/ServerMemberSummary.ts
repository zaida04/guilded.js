/* istanbul ignore file */
/* eslint-disable */

import type { UserSummary } from "./UserSummary";

export type ServerMemberSummary = {
  user: UserSummary;
  roleIds: Array<number>;
};
