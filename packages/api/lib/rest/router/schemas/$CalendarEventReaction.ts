/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CalendarEventReaction = {
    properties: {
        channelId: {
    type: 'string',
    description: `The ID of the channel`,
    isRequired: true,
    format: 'uuid',
},
        createdBy: {
    type: 'string',
    description: `The ID of the user who added the reaction`,
    isRequired: true,
},
        emote: {
    type: 'Emote',
    isRequired: true,
},
        calendarEventId: {
    type: 'number',
    description: `The ID of the calendar event`,
    isRequired: true,
    minimum: 1,
},
    },
} as const;
