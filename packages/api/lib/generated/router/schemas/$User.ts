/* istanbul ignore file */

/* eslint-disable */
export const $User = {
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
    banner: {
      type: "string",
      description: `The banner image associated with the user`,
      format: "media-uri",
    },
    createdAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the user was created at`,
      isRequired: true,
      format: "date-time",
    },
    status: {
      type: "UserStatus",
    },
  },
} as const;
