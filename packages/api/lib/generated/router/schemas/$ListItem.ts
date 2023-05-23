/* istanbul ignore file */

/* eslint-disable */
export const $ListItem = {
  properties: {
    id: {
      type: "string",
      description: `The ID of the list item`,
      isRequired: true,
      format: "uuid",
    },
    serverId: {
      type: "string",
      description: `The ID of the server`,
      isRequired: true,
    },
    channelId: {
      type: "string",
      description: `The ID of the channel`,
      isRequired: true,
      format: "uuid",
    },
    message: {
      type: "string",
      description: `The message of the list item`,
      isRequired: true,
      format: "markdown",
    },
    mentions: {
      type: "Mentions",
    },
    createdAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the list item was created at`,
      isRequired: true,
      format: "date-time",
    },
    createdBy: {
      type: "string",
      description: `The ID of the user who created this list item (Note: If this event has \`createdByWebhookId\` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)`,
      isRequired: true,
    },
    createdByWebhookId: {
      type: "string",
      description: `The ID of the webhook who created this list item, if it was created by a webhook`,
    },
    updatedAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the list item was updated at, if relevant`,
      format: "date-time",
    },
    updatedBy: {
      type: "string",
      description: `The ID of the user who updated this list item`,
    },
    parentListItemId: {
      type: "string",
      description: `The ID of the parent list item if this list item is nested`,
      format: "uuid",
    },
    completedAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the list item was completed at`,
      format: "date-time",
    },
    completedBy: {
      type: "string",
      description: `The ID of the user who completed this list item`,
    },
    note: {
      properties: {
        createdAt: {
          type: "string",
          description: `The ISO 8601 timestamp that the note was created at. If this field is populated, then there's a note associated with the list item`,
          isRequired: true,
          format: "date-time",
        },
        createdBy: {
          type: "string",
          description: `The ID of the user who created this note`,
          isRequired: true,
        },
        updatedAt: {
          type: "string",
          description: `The ISO 8601 timestamp that the note was updated at, if relevant`,
          format: "date-time",
        },
        updatedBy: {
          type: "string",
          description: `The ID of the user who updated this note`,
        },
        mentions: {
          type: "Mentions",
        },
        content: {
          type: "string",
          description: `The note of the list item`,
          isRequired: true,
          format: "markdown",
        },
      },
    },
  },
} as const;
