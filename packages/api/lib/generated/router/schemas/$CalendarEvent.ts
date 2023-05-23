/* istanbul ignore file */

/* eslint-disable */
export const $CalendarEvent = {
  properties: {
    id: {
      type: "number",
      description: `The ID of the calendar event`,
      isRequired: true,
      minimum: 1,
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
    name: {
      type: "string",
      description: `The name of the event`,
      isRequired: true,
      maxLength: 60,
      minLength: 1,
    },
    description: {
      type: "string",
      description: `The description of the event`,
      format: "markdown",
      maxLength: 8000,
      minLength: 1,
    },
    location: {
      type: "string",
      description: `The location of the event`,
      maxLength: 8000,
      minLength: 1,
    },
    url: {
      type: "string",
      description: `A URL to associate with the event`,
      format: "uri",
    },
    color: {
      type: "number",
      description: `The color of the event when viewing in the calendar`,
      maximum: 16777215,
    },
    repeats: {
      type: "boolean",
      description: `Is this event a repeating event`,
    },
    seriesId: {
      type: "string",
      description: `The ID of the calendar event series. Only shows if the event is repeating`,
      format: "uuid",
    },
    roleIds: {
      type: "array",
      contains: {
        type: "number",
        description: `The ID of the role`,
      },
    },
    rsvpDisabled: {
      type: "boolean",
      description: `When disabled, users will not be able to RSVP to the event`,
    },
    isAllDay: {
      type: "boolean",
      description: `Does the event last all day`,
    },
    rsvpLimit: {
      type: "number",
      description: `The number of RSVPs to allow before waitlisting RSVPs`,
      minimum: 1,
    },
    autofillWaitlist: {
      type: "boolean",
      description: `When \`rsvpLimit\` is set, users from the waitlist will be added as space becomes available in the event`,
    },
    startsAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the event starts at`,
      isRequired: true,
      format: "date-time",
    },
    duration: {
      type: "number",
      description: `The duration of the event _**in minutes**_`,
      minimum: 1,
    },
    isPrivate: {
      type: "boolean",
    },
    mentions: {
      type: "Mentions",
    },
    createdAt: {
      type: "string",
      description: `The ISO 8601 timestamp that the event was created at`,
      isRequired: true,
      format: "date-time",
    },
    createdBy: {
      type: "string",
      description: `The ID of the user who created this event`,
      isRequired: true,
    },
    cancellation: {
      properties: {
        description: {
          type: "string",
          description: `The description of event cancellation`,
          format: "markdown",
          maxLength: 140,
          minLength: 1,
        },
        createdBy: {
          type: "string",
          description: `The ID of the user who created this event cancellation`,
          isRequired: true,
        },
      },
    },
  },
} as const;
