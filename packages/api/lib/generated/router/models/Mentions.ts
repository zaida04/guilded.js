/* istanbul ignore file */
/* eslint-disable */

/**
 * Metadata of who or what is mentioned in content
 */
export type Mentions = {
  /**
   * Info on mentioned users
   */
  users?: Array<{
    /**
     * The ID of the user
     */
    id: string;
  }>;
  /**
   * Info on mentioned channels
   */
  channels?: Array<{
    /**
     * The ID of the channel
     */
    id: string;
  }>;
  /**
   * Info on mentioned roles
   */
  roles?: Array<{
    /**
     * The ID of the role
     */
    id: number;
  }>;
  /**
   * If @everyone was mentioned
   */
  everyone?: boolean;
  /**
   * If @here was mentioned
   */
  here?: boolean;
};
