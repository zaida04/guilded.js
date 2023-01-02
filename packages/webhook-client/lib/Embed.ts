import type { APIEmbed } from "@guildedjs/guilded-api-typings";
import { resolveColor } from "./util";

export class Embed {
    public title: string | null;

    public description: string | null;

    public url: string | null;

    public timestamp: number | null;

    public timestampString: string | null;

    public color: number | null;

    public footer: {
        iconURL: string | null;
        proxyIconURL: string | null;
        text: string;
    } | null;

    public image: APIEmbedMediaData | null;

    public thumbnail: APIEmbedMediaData | null;

    public video: APIEmbedMediaData | null;

    public provider: {
        name: string | null;
        url: string | null;
    } | null;

    public author: {
        iconURL: string | null;
        name: string | null;
        proxyIconURL: string | null;
        url: string | null;
    } | null;

    public fields: {
        inline: boolean | null;
        name: string;
        value: string;
    }[];

    public constructor(data?: Partial<APIEmbed>) {
        this.footer = null;
        this.image = null;
        this.thumbnail = null;
        this.author = null;
        this.fields = [];
        this.video = null;
        this.provider = null;
        this.color = null;
        this.timestamp = null;
        this.timestampString = null;
        this.description = null;
        this.url = null;
        this.title = null;

        if (data) this.update(data);
    }

    /* istanbul ignore next */
    public update(data: Partial<APIEmbed>): void {
        if ("color" in data && data.color !== undefined) {
            this.setColor(data.color);
        }

        if ("timestamp" in data && data.timestamp !== undefined) {
            this.setTimestamp(data.timestamp);
        }

        if ("title" in data && data.title !== undefined) {
            this.setTitle(data.title);
        }

        if ("description" in data && data.description !== undefined) {
            this.setDescription(data.description);
        }

        if ("url" in data && data.url !== undefined) {
            this.setURL(data.url);
        }

        if ("provider" in data && data.provider !== undefined) {
            this.setProvider(data.provider.name, data.provider.url);
        }

        if ("footer" in data && data.footer !== undefined) {
            this.setFooter(data.footer.text, data.footer.icon_url, data.footer.proxy_icon_url);
        }

        if ("image" in data && data.image !== undefined) {
            this.setImage(data.image.url, data.image.height, data.image.width, data.image.proxy_url);
        }

        if ("thumbnail" in data && data.thumbnail !== undefined) {
            this.setThumbnail(data.thumbnail.url, data.thumbnail.height, data.thumbnail.width, data.thumbnail.proxy_url);
        }

        if ("author" in data && data.author !== undefined) {
            this.setAuthor(data.author.name, data.author.icon_url, data.author.url, data.author.proxy_icon_url);
        }

        if ("fields" in data && data.fields !== undefined) {
            this.addFields(data.fields);
        }

        if ("video" in data && data.video !== undefined) {
            this.setVideo(data.video.url, data.video.height, data.video.width, data.video.proxy_url);
        }
    }

    public setTitle(title?: string | null): this {
        this.title = title ?? null;
        return this;
    }

    public setDescription(description?: string | null): this {
        this.description = description ?? null;
        return this;
    }

    public setURL(url?: string | null): this {
        this.url = url ?? null;
        return this;
    }

    public setTimestamp(timestamp?: Date | number | string | null): this {
        if (timestamp === null) {
            this.timestamp = null;
            this.timestampString = null;
            return this;
        }

        if (!timestamp) {
            return this.setTimestamp(new Date());
        }

        const parsedTimestamp =
            timestamp instanceof Date ? timestamp : Number.isInteger(timestamp) || typeof timestamp === "string" ? new Date(timestamp) : null;
        if (!parsedTimestamp || (parsedTimestamp instanceof Date && Number.isNaN(parsedTimestamp.getTime()))) {
            throw new TypeError("Invalid DateResolvable passed into setTimestamp.");
        }

        this.timestamp = parsedTimestamp.getTime();
        this.timestampString = parsedTimestamp.toISOString();
        return this;
    }

    public setColor(color?: number | string | [number, number, number] | null): this {
        this.color = color ? resolveColor(color) : null;
        return this;
    }

    public setFooter(text?: string, iconURL?: string | null, proxyIconURL?: string | null): this {
        this.footer = text ? { iconURL: iconURL ?? null, proxyIconURL: proxyIconURL ?? null, text } : null;
        return this;
    }

    public setImage(url?: string, height?: string | null, width?: string | null, proxyURL?: string | null): this {
        this.image = url ? { height: height ?? null, proxyURL: proxyURL ?? null, url, width: width ?? null } : null;
        return this;
    }

    public setThumbnail(url?: string, height?: string | null, width?: string | null, proxyURL?: string | null): this {
        this.thumbnail = url ? { height: height ?? null, proxyURL: proxyURL ?? null, url, width: width ?? null } : null;
        return this;
    }

    public setVideo(url?: string, height?: string | null, width?: string | null, proxyURL?: string | null): this {
        this.video = url ? { height: height ?? null, proxyURL: proxyURL ?? null, url, width: width ?? null } : null;
        return this;
    }

    public setProvider(name?: string | null, url?: string | null): this {
        this.provider = name && url ? { name: name ?? null, url: url ?? null } : null;
        return this;
    }

    public setAuthor(name?: string, iconURL?: string | null, url?: string | null, proxyIconURL?: string | null): this {
        this.author = name
            ? {
                  iconURL: iconURL ?? null,
                  name: name ?? null,
                  proxyIconURL: proxyIconURL ?? null,
                  url: url ?? null,
              }
            : null;
        return this;
    }

    public addFields(fields: { inline?: boolean, name: string; value: string; }[]): this {
        this.fields.push(
            ...fields.map((field) => ({
                inline: field.inline ?? false,
                name: field.name,
                value: field.value,
            })),
        );
        return this;
    }

    public addField(name: string, value: string, inline?: boolean): this {
        this.addFields([{ inline, name, value }]);
        return this;
    }

    public clearFields(): this {
        this.fields.length = 0;
        return this;
    }

    public toJSON(): APIEmbed {
        return {
            author: this.author?.name
                ? {
                      icon_url: this.author.iconURL ?? undefined,
                      name: this.author.name,
                      proxy_icon_url: this.author.proxyIconURL ?? undefined,
                      url: this.author.url ?? undefined,
                  }
                : undefined,
            color: this.color ?? undefined,
            description: this.description ?? undefined,
            fields:
                this.fields.map((field) => ({
                    inline: field.inline ?? false,
                    name: field.name,
                    value: field.value,
                })) ?? undefined,
            footer: this.footer
                ? {
                      icon_url: this.footer.iconURL ?? undefined,
                      proxy_icon_url: this.footer.proxyIconURL ?? undefined,
                      text: this.footer.text ?? undefined,
                  }
                : undefined,
            image: this.image
                ? {
                      height: this.image.height ?? undefined,
                      proxy_url: this.image.proxyURL ?? undefined,
                      url: this.image.url ?? undefined,
                      width: this.image.width ?? undefined,
                  }
                : undefined,
            provider: this.provider
                ? {
                      name: this.provider.name ?? undefined,
                      url: this.provider.url ?? undefined,
                  }
                : undefined,
            thumbnail: this.thumbnail
                ? {
                      height: this.thumbnail.height ?? undefined,
                      proxy_url: this.thumbnail.proxyURL ?? undefined,
                      url: this.thumbnail.url ?? undefined,
                      width: this.thumbnail.width ?? undefined,
                  }
                : undefined,
            timestamp: this.timestampString ?? undefined,
            title: this.title ?? undefined,
            url: this.url ?? undefined,
            video: this.video
                ? {
                      height: this.video.height ?? undefined,
                      proxy_url: this.video.proxyURL ?? undefined,
                      url: this.video.url ?? undefined,
                      width: this.video.width ?? undefined,
                  }
                : undefined,
        };
    }
}

export type APIEmbedMediaData = {
    height: string | null;
    proxyURL: string | null;
    url: string;
    width: string | null;
}
