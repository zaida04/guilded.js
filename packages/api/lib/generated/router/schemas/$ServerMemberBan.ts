/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ServerMemberBan = {
    properties: {
        user: {
    type: 'UserSummary',
    isRequired: true,
},
        reason: {
    type: 'string',
    description: `The reason for the ban as submitted by the banner`,
},
        createdBy: {
    type: 'string',
    description: `The ID of the user who created this server member ban`,
    isRequired: true,
},
        createdAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the server member ban was created at`,
    isRequired: true,
    format: 'date-time',
},
    },
} as const;
