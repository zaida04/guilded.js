/* istanbul ignore file */
/* eslint-disable */

/**
 * Rich content sections optionally associated with chat messages. Properties with "webhook-markdown" support allow for the following: link, italic, bold, strikethrough, underline, inline code, block code, reaction, and mention.
 */
export type ChatEmbed = {
  /**
   * Main header of the embed
   */
  title?: string;
  /**
   * Subtext of the embed
   */
  description?: string;
  /**
   * URL to linkify the `title` field with
   */
  url?: string;
  /**
   * The integer value corresponds to the decimal RGB representation for the color. The color that the left border should be
   */
  color?: number;
  /**
   * A small section at the bottom of the embed
   */
  footer?: {
    /**
     * URL of a small image to put in the footer
     */
    icon_url?: string;
    /**
     * Text of the footer
     */
    text: string;
  };
  /**
   * A timestamp to put in the footer
   */
  timestamp?: string;
  /**
   * An image to the right of the embed's content
   */
  thumbnail?: {
    /**
     * URL of the image
     */
    url?: string;
  };
  /**
   * The main picture to associate with the embed
   */
  image?: {
    /**
     * URL of the image
     */
    url?: string;
  };
  /**
   * A small section above the title of the embed
   */
  author?: {
    /**
     * Name of the author
     */
    name?: string;
    /**
     * URL to linkify the author's `name` field
     */
    url?: string;
    /**
     * URL of a small image to display to the left of the author's `name`
     */
    icon_url?: string;
  };
  /**
   * Table-like cells to add to the embed
   */
  fields?: Array<{
    /**
     * Header of the table-like cell
     */
    name: string;
    /**
     * Subtext of the table-like cell
     */
    value: string;
    /**
     * If the field should wrap or not
     */
    inline?: boolean;
  }>;
};
