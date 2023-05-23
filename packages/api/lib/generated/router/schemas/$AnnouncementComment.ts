/* istanbul ignore file */

/* eslint-disable */
export const $AnnouncementComment = {
  properties: {
    id: {
      type: "number",
      description: `The ID of the announcement comment`,
      isRequired: true,
      minimum: 1,
    },
    content: {
      type: "string",
      description: `The content of the announcement comment`,
      isRequired: true,
      format: "markdown",
      maxLength: 10000,
      minLength: 1,
    },
    createdAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the announcement comment was created at`,
      isRequired: true,
      format: "date-time",
    },
    updatedAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the announcement comment was updated at, if relevant`,
      format: "date-time",
    },
    createdBy: {
      type: "string",
      description: `The ID of the user who created this announcement comment (Note: If this event has \`createdByWebhookId\` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)`,
      isRequired: true,
    },
    channelId: {
      type: "string",
      description: `The ID of the channel`,
      isRequired: true,
      format: "uuid",
    },
    announcementId: {
      type: "string",
      description: `The ID of the announcement`,
      isRequired: true,
    },
    mentions: {
      type: "Mentions",
    },
  },
} as const;
