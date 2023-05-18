/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DocComment = {
    properties: {
        id: {
    type: 'number',
    description: `The ID of the doc comment`,
    isRequired: true,
},
        content: {
    type: 'string',
    description: `The content of the doc comment`,
    isRequired: true,
    format: 'markdown',
    maxLength: 10000,
    minLength: 1,
},
        createdAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the doc comment was created at`,
    isRequired: true,
    format: 'date-time',
},
        createdBy: {
    type: 'string',
    description: `The ID of the user who created this doc comment (Note: If this event has \`createdByWebhookId\` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)`,
    isRequired: true,
},
        updatedAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the doc comment was updated at, if relevant`,
    format: 'date-time',
},
        channelId: {
    type: 'string',
    description: `The ID of the channel`,
    isRequired: true,
    format: 'uuid',
},
        docId: {
    type: 'number',
    description: `The ID of the doc`,
    isRequired: true,
    minimum: 1,
},
        mentions: {
    type: 'Mentions',
},
    },
} as const;
