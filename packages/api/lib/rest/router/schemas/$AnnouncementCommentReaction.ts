/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AnnouncementCommentReaction = {
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
        announcementId: {
    type: 'string',
    description: `The ID of the announcement`,
    isRequired: true,
},
        announcementCommentId: {
    type: 'number',
    description: `The ID of the announcement comment`,
    isRequired: true,
    minimum: 1,
},
    },
} as const;
