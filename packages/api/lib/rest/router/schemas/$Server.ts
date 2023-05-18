/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Server = {
    properties: {
        id: {
    type: 'string',
    description: `The ID of the server`,
    isRequired: true,
},
        ownerId: {
    type: 'string',
    description: `The ID of the user who created this server`,
    isRequired: true,
},
        type: {
    type: 'Enum',
},
        name: {
    type: 'string',
    description: `The name given to the server`,
    isRequired: true,
},
        url: {
    type: 'string',
    description: `The URL that the server can be accessible from. For example, a value of "Guilded-Official" means the server can be accessible from https://www.guilded.gg/Guilded-Official`,
},
        about: {
    type: 'string',
    description: `The description associated with the server`,
},
        avatar: {
    type: 'string',
    description: `The avatar image associated with the server`,
    format: 'media-uri',
},
        banner: {
    type: 'string',
    description: `The banner image associated with the server`,
    format: 'media-uri',
},
        timezone: {
    type: 'string',
    description: `The timezone associated with the server`,
},
        isVerified: {
    type: 'boolean',
    description: `The verified status of the server`,
},
        defaultChannelId: {
    type: 'string',
    description: `The channel ID of the default channel of the server. This channel is defined as the first chat or voice channel in the left sidebar of a server in our UI. This channel is useful for sending welcome messages, though note that a bot may not have permissions to interact with this channel depending on how the server is configured.`,
    format: 'uuid',
},
        createdAt: {
    type: 'string',
    description: `The ISO 8601 timestamp that the server was created at`,
    isRequired: true,
    format: 'date-time',
},
    },
} as const;
