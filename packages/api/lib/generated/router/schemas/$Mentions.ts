/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Mentions = {
    type: 'any-of',
    description: `Metadata of who or what is mentioned in content`,
    contains: [{
    properties: {
        users: {
    type: 'array',
    contains: {
    properties: {
        id: {
    type: 'string',
    description: `The ID of the user`,
    isRequired: true,
},
    },
},
},
        channels: {
    type: 'array',
    contains: {
    properties: {
        id: {
    type: 'string',
    description: `The ID of the channel`,
    isRequired: true,
    format: 'uuid',
},
    },
},
},
        roles: {
    type: 'array',
    contains: {
    properties: {
        id: {
    type: 'number',
    description: `The ID of the role`,
    isRequired: true,
},
    },
},
},
        everyone: {
    type: 'boolean',
    description: `If @everyone was mentioned`,
},
        here: {
    type: 'boolean',
    description: `If @here was mentioned`,
},
    },
}],
} as const;
