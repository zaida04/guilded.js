/* istanbul ignore file */

/* eslint-disable */
export const $CalendarEventSeries = {
  properties: {
    id: {
      type: "string",
      description: `The ID of the calendar event series`,
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
  },
} as const;
