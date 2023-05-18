/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChatEmbed = {
    description: `Rich content sections optionally associated with chat messages. Properties with "webhook-markdown" support allow for the following: link, italic, bold, strikethrough, underline, inline code, block code, reaction, and mention.`,
    properties: {
        title: {
    type: 'string',
    description: `Main header of the embed`,
    format: 'webhook-markdown',
    maxLength: 256,
},
        description: {
    type: 'string',
    description: `Subtext of the embed`,
    format: 'webhook-markdown',
    maxLength: 2048,
},
        url: {
    type: 'string',
    description: `URL to linkify the \`title\` field with`,
    format: 'uri',
    maxLength: 1024,
    pattern: '^(?!attachment)',
},
        color: {
    type: 'number',
    description: `Decimal value of the color that the left border should be`,
    maximum: 16777215,
},
        footer: {
    description: `A small section at the bottom of the embed`,
    properties: {
        icon_url: {
    type: 'string',
    description: `URL of a small image to put in the footer`,
    format: 'media-uri',
    maxLength: 1024,
},
        text: {
    type: 'string',
    description: `Text of the footer`,
    isRequired: true,
    maxLength: 2048,
},
    },
},
        timestamp: {
    type: 'string',
    description: `A timestamp to put in the footer`,
    format: 'date-time',
},
        thumbnail: {
    description: `An image to the right of the embed's content`,
    properties: {
        url: {
    type: 'string',
    description: `URL of the image`,
    format: 'media-uri',
    maxLength: 1024,
},
    },
},
        image: {
    description: `The main picture to associate with the embed`,
    properties: {
        url: {
    type: 'string',
    description: `URL of the image`,
    format: 'media-uri',
    maxLength: 1024,
},
    },
},
        author: {
    description: `A small section above the title of the embed`,
    properties: {
        name: {
    type: 'string',
    description: `Name of the author`,
    maxLength: 256,
},
        url: {
    type: 'string',
    description: `URL to linkify the author's \`name\` field`,
    format: 'uri',
    maxLength: 1024,
    pattern: '^(?!attachment)',
},
        icon_url: {
    type: 'string',
    description: `URL of a small image to display to the left of the author's \`name\``,
    format: 'media-uri',
    maxLength: 1024,
},
    },
},
        fields: {
    type: 'array',
    contains: {
    properties: {
        name: {
    type: 'string',
    description: `Header of the table-like cell`,
    isRequired: true,
    format: 'webhook-markdown',
    maxLength: 256,
},
        value: {
    type: 'string',
    description: `Subtext of the table-like cell`,
    isRequired: true,
    format: 'webhook-markdown',
    maxLength: 1024,
},
        inline: {
    type: 'boolean',
    description: `If the field should wrap or not`,
},
    },
},
},
    },
} as const;
