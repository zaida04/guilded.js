/* istanbul ignore file */

/* eslint-disable */
export const $Group = {
  properties: {
    id: {
      type: "string",
      description: `The ID of the group`,
      isRequired: true,
    },
    serverId: {
      type: "string",
      description: `The ID of the server`,
      isRequired: true,
    },
    name: {
      type: "string",
      description: `The name of the group`,
      isRequired: true,
      maxLength: 80,
      minLength: 1,
    },
    description: {
      type: "string",
      description: `The description associated with the group`,
      maxLength: 280,
    },
    avatar: {
      type: "string",
      description: `The avatar image associated with the group`,
      format: "media-uri",
    },
    isHome: {
      type: "boolean",
      description: `If \`true\`, this is the server's home group`,
    },
    emoteId: {
      type: "number",
      description: `The emote to associate with the group`,
    },
    isPublic: {
      type: "boolean",
      description: `Is this group open for anyone to join?`,
    },
    createdAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the group was created at`,
      isRequired: true,
      format: "date-time",
    },
    createdBy: {
      type: "string",
      description: `The ID of the user who created this group`,
      isRequired: true,
    },
    updatedAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the group was updated at, if relevant`,
      format: "date-time",
    },
    updatedBy: {
      type: "string",
      description: `The ID of the user who updated this group`,
    },
    archivedAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the group was archived at, if relevant`,
      format: "date-time",
    },
    archivedBy: {
      type: "string",
      description: `The ID of the user who archived this group`,
    },
  },
} as const;
