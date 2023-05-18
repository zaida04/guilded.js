/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ForumTopicSummary = {
    properties: {
        id: {
    type: 'number',
    description: `The ID of the forum topic`,
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
        title: {
    type: 'string',
    description: `The title of the forum topic`,
    isRequired: true,
    maxLength: 500,
    minLength: 1,
},
        createdAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the forum topic was created at`,
    isRequired: true,
    format: 'date-time',
},
        createdBy: {
    type: 'string',
    description: `The ID of the user who created this forum topic (Note: If this event has \`createdByWebhookId\` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)`,
    isRequired: true,
},
        updatedAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the forum topic was updated at, if relevant`,
    format: 'date-time',
},
        bumpedAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the forum topic was bumped at. This timestamp is updated whenever there is any activity on the posts within the forum topic.`,
    format: 'date-time',
},
        isPinned: {
    type: 'boolean',
},
        isLocked: {
    type: 'boolean',
},
    },
} as const;
