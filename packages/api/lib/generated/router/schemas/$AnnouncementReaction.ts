/* istanbul ignore file */

/* eslint-disable */
export const $AnnouncementReaction = {
  properties: {
    channelId: {
      type: "string",
      description: `The ID of the channel`,
      isRequired: true,
      format: "uuid",
    },
    createdBy: {
      type: "string",
      description: `The ID of the user who added the reaction`,
      isRequired: true,
    },
    emote: {
      type: "Emote",
      isRequired: true,
    },
    announcementId: {
      type: "string",
      description: `The ID of the announcement`,
      isRequired: true,
    },
  },
} as const;
