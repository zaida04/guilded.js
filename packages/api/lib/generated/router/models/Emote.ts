/* istanbul ignore file */
/* eslint-disable */

export type Emote = {
  /**
   * The ID of the emote
   */
  id: number;
  /**
   * The name of the emote
   */
  name: string;
  /**
   * The URL of the emote image
   */
  url: string;
  /**
   * The ID of the server the emote was created on
   */
  serverId?: string;
};
