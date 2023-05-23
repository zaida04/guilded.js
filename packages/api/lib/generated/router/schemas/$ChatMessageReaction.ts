/* istanbul ignore file */

/* eslint-disable */
export const $ChatMessageReaction = {
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
    messageId: {
      type: "string",
      description: `The ID of the message`,
      isRequired: true,
      format: "uuid",
    },
  },
} as const;
