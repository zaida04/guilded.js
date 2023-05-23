/* istanbul ignore file */

/* eslint-disable */
export const $ServerChannel = {
  properties: {
    id: {
      type: "string",
      description: `The ID of the channel`,
      isRequired: true,
      format: "uuid",
    },
    type: {
      type: "Enum",
      isRequired: true,
    },
    name: {
      type: "string",
      description: `The name of the channel`,
      isRequired: true,
      maxLength: 100,
      minLength: 1,
    },
    topic: {
      type: "string",
      description: `The topic of the channel`,
      maxLength: 512,
      minLength: 1,
    },
    createdAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the channel was created at`,
      isRequired: true,
      format: "date-time",
    },
    createdBy: {
      type: "string",
      description: `The ID of the user who created this channel`,
      isRequired: true,
    },
    updatedAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the channel was updated at, if relevant`,
      format: "date-time",
    },
    serverId: {
      type: "string",
      description: `The ID of the server`,
      isRequired: true,
    },
    parentId: {
      type: "string",
      description: `ID of the parent channel or parent thread, if present. Only relevant for server channels`,
      format: "uuid",
    },
    categoryId: {
      type: "number",
      description: `Only relevant for server channels`,
    },
    groupId: {
      type: "string",
      description: `The ID of the group`,
      isRequired: true,
    },
    isPublic: {
      type: "boolean",
      description: `Whether the channel can be accessed from users who are not member of the server`,
    },
    archivedBy: {
      type: "string",
      description: `The ID of the user who archived this channel`,
    },
    archivedAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the channel was archived at, if relevant`,
      format: "date-time",
    },
  },
} as const;
