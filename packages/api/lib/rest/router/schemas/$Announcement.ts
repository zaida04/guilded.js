/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Announcement = {
    properties: {
        id: {
    type: 'string',
    description: `The ID of the announcement`,
    isRequired: true,
},
        serverId: {
    type: 'string',
    description: `The ID of the server`,
    isRequired: true,
},
        channelId: {
    type: 'string',
    description: `The ID of the channel`,
    isRequired: true,
    format: 'uuid',
},
        createdAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the announcement was created at`,
    isRequired: true,
    format: 'date-time',
},
        createdBy: {
    type: 'string',
    description: `The ID of the user who created this announcement`,
    isRequired: true,
},
        content: {
    type: 'string',
    description: `The content of the announcement`,
    isRequired: true,
    format: 'markdown',
},
        mentions: {
    type: 'Mentions',
},
        title: {
    type: 'string',
    description: `The title of the announcement`,
    isRequired: true,
    maxLength: 128,
    minLength: 1,
},
    },
} as const;
