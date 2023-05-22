/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Role = {
    properties: {
        id: {
    type: 'number',
    description: `The ID of the role`,
    isRequired: true,
},
        serverId: {
    type: 'string',
    description: `The ID of the server`,
    isRequired: true,
},
        createdAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the role was created at`,
    isRequired: true,
    format: 'date-time',
},
        updatedAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the role was updated at, if relevant`,
    format: 'date-time',
},
        name: {
    type: 'string',
    description: `The role's name`,
    isRequired: true,
},
        isDisplayedSeparately: {
    type: 'boolean',
    description: `If set, the role will be displayed separately in the channel member list`,
},
        isSelfAssignable: {
    type: 'boolean',
    description: `If set, this roll will be self assigned`,
},
        isMentionable: {
    type: 'boolean',
    description: `If set, this role can be mentioned`,
},
        permissions: {
    type: 'array',
    contains: {
    type: 'string',
},
    isRequired: true,
},
        colors: {
    type: 'array',
    contains: {
    type: 'number',
    description: `The integer value corresponds to the decimal RGB representation for the color`,
    maximum: 16777215,
},
},
        icon: {
    type: 'string',
    description: `The URL of the role icon`,
    format: 'media-uri',
},
        position: {
    type: 'number',
    description: `The position the role will be in relation to the roles in the server`,
    isRequired: true,
},
        isBase: {
    type: 'boolean',
    description: `The default role users are given when joining the server. Base roles are tied directly to the server and cannot be created or deleted`,
},
    },
} as const;
