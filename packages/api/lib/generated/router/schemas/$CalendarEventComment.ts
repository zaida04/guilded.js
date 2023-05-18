/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CalendarEventComment = {
    properties: {
        id: {
    type: 'number',
    description: `The ID of the calendar event comment`,
    isRequired: true,
    minimum: 1,
},
        content: {
    type: 'string',
    description: `The content of the calendar event comment`,
    isRequired: true,
    format: 'markdown',
    maxLength: 10000,
    minLength: 1,
},
        createdAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the calendar event comment was created at`,
    isRequired: true,
    format: 'date-time',
},
        updatedAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the calendar event comment was updated at, if relevant`,
    format: 'date-time',
},
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
        createdBy: {
    type: 'string',
    description: `The ID of the user who created this calendar event comment (Note: If this event has \`createdByWebhookId\` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)`,
    isRequired: true,
},
        mentions: {
    type: 'Mentions',
},
    },
} as const;
