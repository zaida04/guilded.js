/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CalendarEventRsvp = {
    properties: {
        calendarEventId: {
    type: 'number',
    description: `The ID of the calendar event`,
    isRequired: true,
    minimum: 1,
},
        channelId: {
    type: 'string',
    description: `The ID of the channel`,
    isRequired: true,
    format: 'uuid',
},
        serverId: {
    type: 'string',
    description: `The ID of the server`,
    isRequired: true,
},
        userId: {
    type: 'string',
    description: `The ID of the user`,
    isRequired: true,
},
        status: {
    type: 'Enum',
    isRequired: true,
},
        createdBy: {
    type: 'string',
    description: `The ID of the user who created this RSVP`,
    isRequired: true,
},
        createdAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the RSVP was created at`,
    isRequired: true,
    format: 'date-time',
},
        updatedBy: {
    type: 'string',
    description: `The ID of the user who updated this RSVP`,
},
        updatedAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the RSVP was updated at, if relevant`,
    format: 'date-time',
},
    },
} as const;
