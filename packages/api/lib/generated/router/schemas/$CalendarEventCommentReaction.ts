/* istanbul ignore file */

/* eslint-disable */
export const $CalendarEventCommentReaction = {
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
    calendarEventId: {
      type: "number",
      description: `The ID of the calendar event`,
      isRequired: true,
      minimum: 1,
    },
    calendarEventCommentId: {
      type: "number",
      description: `The ID of the calendar event comment`,
      isRequired: true,
      minimum: 1,
    },
  },
} as const;
