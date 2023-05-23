/* istanbul ignore file */

/* eslint-disable */
export const $UserSummary = {
  properties: {
    id: {
      type: "string",
      description: `The ID of the user`,
      isRequired: true,
    },
    type: {
      type: "Enum",
    },
    name: {
      type: "string",
      description: `The user's name`,
      isRequired: true,
    },
    avatar: {
      type: "string",
      description: `The avatar image associated with the user`,
      format: "media-uri",
    },
  },
} as const;
