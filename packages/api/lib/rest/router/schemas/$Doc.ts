/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Doc = {
    properties: {
        id: {
    type: 'number',
    description: `The ID of the doc`,
    isRequired: true,
    minimum: 1,
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
        title: {
    type: 'string',
    description: `The title of the doc`,
    isRequired: true,
    minLength: 1,
},
        content: {
    type: 'string',
    description: `The content of the doc`,
    isRequired: true,
    format: 'markdown',
},
        mentions: {
    type: 'Mentions',
},
        createdAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the doc was created at`,
    isRequired: true,
    format: 'date-time',
},
        createdBy: {
    type: 'string',
    description: `The ID of the user who created this doc`,
    isRequired: true,
},
        updatedAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the doc was updated at, if relevant`,
    format: 'date-time',
},
        updatedBy: {
    type: 'string',
    description: `The ID of the user who updated this doc`,
},
    },
} as const;
