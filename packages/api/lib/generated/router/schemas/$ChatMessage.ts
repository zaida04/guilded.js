/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChatMessage = {
    type: 'any-of',
    contains: [{
    properties: {
        id: {
    type: 'string',
    description: `The ID of the message`,
    isRequired: true,
    format: 'uuid',
},
        type: {
    type: 'Enum',
    isRequired: true,
},
        serverId: {
    type: 'string',
    description: `The ID of the server`,
},
        groupId: {
    type: 'string',
    description: `The ID of the group`,
},
        channelId: {
    type: 'string',
    description: `The ID of the channel`,
    isRequired: true,
    format: 'uuid',
},
        content: {
    type: 'string',
    description: `The content of the message`,
    format: 'markdown',
},
        embeds: {
    type: 'array',
    contains: {
        type: 'ChatEmbed',
    },
},
        replyMessageIds: {
    type: 'array',
    contains: {
    type: 'string',
    description: `The ID of the message`,
    format: 'uuid',
},
},
        isPrivate: {
    type: 'boolean',
    description: `If set, this message will only be seen by those mentioned or replied to`,
},
        isSilent: {
    type: 'boolean',
    description: `If set, this message did not notify mention or reply recipients`,
},
        mentions: {
    type: 'Mentions',
},
        createdAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the message was created at`,
    isRequired: true,
    format: 'date-time',
},
        createdBy: {
    type: 'string',
    description: `The ID of the user who created this message (Note: If this event has \`createdByWebhookId\` present, this field will still be populated, but can be ignored. In this case, the value of this field will always be Ann6LewA)`,
    isRequired: true,
},
        createdByWebhookId: {
    type: 'string',
    description: `The ID of the webhook who created this message, if it was created by a webhook`,
},
        updatedAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the message was updated at, if relevant`,
    format: 'date-time',
},
    },
}],
} as const;
