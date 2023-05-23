/* istanbul ignore file */

/* eslint-disable */
export const $ServerMember = {
  properties: {
    user: {
      type: "User",
      isRequired: true,
    },
    roleIds: {
      type: "array",
      contains: {
        type: "number",
        description: `The ID of the role`,
      },
      isRequired: true,
    },
    nickname: {
      type: "string",
    },
    joinedAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the member was created at`,
      isRequired: true,
      format: "date-time",
    },
    isOwner: {
      type: "boolean",
    },
  },
} as const;
