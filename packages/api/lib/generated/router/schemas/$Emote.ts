/* istanbul ignore file */

/* eslint-disable */
export const $Emote = {
  properties: {
    id: {
      type: "number",
      description: `The ID of the emote`,
      isRequired: true,
    },
    name: {
      type: "string",
      description: `The name of the emote`,
      isRequired: true,
    },
    url: {
      type: "string",
      description: `The URL of the emote image`,
      isRequired: true,
      format: "media-uri",
    },
    serverId: {
      type: "string",
      description: `The ID of the server the emote was created on`,
    },
  },
} as const;
