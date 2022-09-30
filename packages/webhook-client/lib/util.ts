import type { APIEmbed, RESTPostWebhookBody } from "@guildedjs/guilded-api-typings";

import { COLORS } from "./consts";
import type { Embed } from "./Embed";

/**
 * Copyright 2015 - 2021 Amish Shah
 * Copyrights licensed under the Apache License 2.0, https://github.com/discordjs/discord.js/blob/master/LICENSE
 * Taken from https://github.com/discordjs/discord.js/blob/stable/src/util/Util.js#L436
 */
export function resolveColor(color: string | number | [number, number, number]): number {
    if (typeof color === "string") {
        if (color === "RANDOM") return Math.floor(Math.random() * (0xffffff + 1));
        color = COLORS[color.toUpperCase()] ?? parseInt(color.replace("#", ""), 16);
    } else if (Array.isArray(color)) {
        color = (color[0] << 16) + (color[1] << 8) + color[2];
    }

    if (color < 0 || color > 0xffffff) throw new RangeError("COLOR_RANGE");
    else if (isNaN(color)) throw new TypeError("COLOR_CONVERT");

    return color;
}

export interface MessageAttachment {
    content?: Buffer;
    name: string;
    path?: string;
}
export type MessageContent = (RESTPostWebhookBody & { embeds?: (Embed | APIEmbed)[]; files?: MessageAttachment[] }) | string;
