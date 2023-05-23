/* istanbul ignore file */

/* eslint-disable */
export const $UserStatus = {
  properties: {
    content: {
      type: "string",
      description: `The content of the user status. The supported markdown for this content only includes reactions and plaintext for now`,
      format: "markdown",
    },
    emoteId: {
      type: "number",
      description: `Emote ID`,
    },
  },
} as const;
