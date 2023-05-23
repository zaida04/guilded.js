/* istanbul ignore file */

/* eslint-disable */
export const $DocReaction = {
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
    docId: {
      type: "number",
      description: `The ID of the doc`,
      isRequired: true,
      minimum: 1,
    },
  },
} as const;
