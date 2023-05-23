/* istanbul ignore file */

/* eslint-disable */
export const $ForumTopicComment = {
  properties: {
    id: {
      type: "number",
      description: `The ID of the forum topic comment`,
      isRequired: true,
    },
    content: {
      type: "string",
      description: `The content of the forum topic comment`,
      isRequired: true,
      format: "markdown",
      maxLength: 10000,
      minLength: 1,
    },
    createdAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the forum topic comment was created at`,
      isRequired: true,
      format: "date-time",
    },
    updatedAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the forum topic comment was updated at, if relevant`,
      format: "date-time",
    },
    channelId: {
      type: "string",
      description: `The ID of the channel`,
      isRequired: true,
      format: "uuid",
    },
    forumTopicId: {
      type: "number",
      description: `The ID of the forum topic`,
      isRequired: true,
    },
    createdBy: {
      type: "string",
      description: `The ID of the user who created this forum topic comment (Note: If this event has \`createdByWebhookId\` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)`,
      isRequired: true,
    },
    mentions: {
      type: "Mentions",
    },
  },
} as const;
