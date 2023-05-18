/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Webhook = {
    properties: {
        id: {
    type: 'string',
    description: `The ID of the webhook`,
    isRequired: true,
    format: 'uuid',
},
        name: {
    type: 'string',
    description: `The name of the webhook`,
    isRequired: true,
    maxLength: 128,
    minLength: 1,
},
        avatar: {
    type: 'string',
    description: `The avatar image associated with the webhook`,
    format: 'media-uri',
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
    description: `The ISO 8601 timestamp that the webhook was created at`,
    isRequired: true,
    format: 'date-time',
},
        createdBy: {
    type: 'string',
    description: `The ID of the user who created this webhook`,
    isRequired: true,
},
        deletedAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the webhook was deleted at`,
    format: 'date-time',
},
        token: {
    type: 'string',
    description: `The token of the webhook`,
},
    },
} as const;
