/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SocialLink = {
    properties: {
        type: {
    type: 'Enum',
    isRequired: true,
},
        userId: {
    type: 'string',
    description: `The ID of the user that the social link is associated with`,
    isRequired: true,
},
        handle: {
    type: 'string',
    description: `The handle of the user within the external service`,
},
        serviceId: {
    type: 'string',
    description: `The unique ID that represents this member's social link within the external service`,
},
        createdAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the social link was created at`,
    isRequired: true,
    format: 'date-time',
},
    },
} as const;
