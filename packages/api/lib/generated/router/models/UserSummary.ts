/* istanbul ignore file */
/* eslint-disable */

export type UserSummary = {
  /**
   * The ID of the user
   */
  id: string;
  /**
   * The type of user. If this property is absent, it can assumed to be of type `user`
   */
  type?: "bot" | "user";
  /**
   * The user's name
   */
  name: string;
  /**
   * The avatar image associated with the user
   */
  avatar?: string;
};
