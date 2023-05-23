/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ForumTopicReaction = {
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
        forumTopicId: {
    type: 'number',
    description: `The ID of the forum topic`,
    isRequired: true,
},
    },
} as const;