/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ServerMemberSummary = {
    properties: {
        user: {
    type: 'UserSummary',
    isRequired: true,
},
        roleIds: {
    type: 'array',
    contains: {
    type: 'number',
    description: `The ID of the role`,
},
    isRequired: true,
},
    },
} as const;
