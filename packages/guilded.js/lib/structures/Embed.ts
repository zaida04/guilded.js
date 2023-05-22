import type { ChatEmbedPayload, EmbedPayload } from "@guildedjs/api";
import { resolveColor } from "@guildedjs/api";

export class Embed {
	title: string | null;
	description: string | null;
	url: string | null;
	timestamp: number | null;
	color: number | null;
	image: APIEmbedMediaData | null;
	thumbnail: APIEmbedMediaData | null;
	video: APIEmbedMediaData | null;
	author: {
		name: string | null;
		iconURL: string | null;
		url: string | null;
	} | null;
	fields: {
		inline: boolean | null;
		name: string;
		value: string;
	}[];
	footer: {
		text: string;
		iconURL: string | null;
	} | null;
	private timestampString: string | null;

	constructor(data?: Partial<ChatEmbedPayload>) {
		this.footer = null;
		this.image = null;
		this.thumbnail = null;
		this.author = null;
		this.fields = [];
		this.video = null;
		this.color = null;
		this.timestamp = null;
		this.timestampString = null;
		this.description = null;
		this.url = null;
		this.title = null;

		if (data) this._update(data);
	}

	_update(data: Partial<ChatEmbedPayload>): void {
		if ("color" in data) this.setColor(data.color);
		if ("timestamp" in data) this.setTimestamp(data.timestamp);
		if ("title" in data) this.setTitle(data.title);
		if ("description" in data) this.setDescription(data.description);
		if ("url" in data) this.setURL(data.url);
		if ("footer" in data)
			this.setFooter(data.footer?.text, data.footer?.icon_url ?? null);
		if ("image" in data) this.setImage(data.image?.url);
		if ("thumbnail" in data) this.setThumbnail(data.thumbnail?.url);
		if ("author" in data)
			this.setAuthor(
				data.author?.name,
				data.author?.icon_url,
				data.author?.url
			);
		if ("fields" in data) this.addFields(data.fields ?? []);
	}

	setTitle(title?: string | null): this {
		this.title = title ?? null;
		return this;
	}

	setDescription(description?: string | null): this {
		this.description = description ?? null;
		return this;
	}

	setURL(url?: string | null): this {
		this.url = url ?? null;
		return this;
	}

	setTimestamp(timestamp?: string | number | Date | null): this {
		if (timestamp === null) {
			this.timestamp = null;
			this.timestampString = null;
			return this;
		}

		if (!timestamp) {
			return this.setTimestamp(new Date());
		}

		const parsedTimestamp =
			timestamp instanceof Date
				? timestamp
				: Number.isInteger(timestamp) || typeof timestamp === "string"
					? new Date(timestamp)
					: null;
		if (
			!parsedTimestamp ||
			(parsedTimestamp instanceof Date && isNaN(parsedTimestamp.getTime()))
		) {
			throw new TypeError("Invalid DateResolvable passed into setTimestamp.");
		}

		this.timestamp = parsedTimestamp.getTime();
		this.timestampString = parsedTimestamp.toISOString();
		return this;
	}

	setColor(color?: string | number | [number, number, number] | null): this {
		this.color = color ? resolveColor(color) : null;
		return this;
	}

	setFooter(text?: string, iconURL?: string | null): this {
		this.footer = text ? { iconURL: iconURL ?? null, text } : null;
		return this;
	}

	setImage(url?: string): this {
		this.image = url ? { url } : null;
		return this;
	}

	setThumbnail(url?: string): this {
		this.thumbnail = url ? { url } : null;
		return this;
	}

	setAuthor(name?: string, iconURL?: string | null, url?: string | null): this {
		this.author = name
			? {
				iconURL: iconURL ?? null,
				name: name ?? null,
				url: url ?? null,
			}
			: null;
		return this;
	}

	addFields(fields: { name: string; value: string; inline?: boolean }[]): this {
		this.fields.push(
			...fields.map((field) => ({
				inline: field.inline ?? false,
				name: field.name,
				value: field.value,
			}))
		);
		return this;
	}

	addField(name: string, value: string, inline?: boolean): this {
		this.addFields([{ inline, name, value }]);
		return this;
	}

	clearFields(): this {
		this.fields.length = 0;
		return this;
	}

	toJSON(): EmbedPayload {
		return {
			author: this.author?.name
				? {
					icon_url: this.author.iconURL ?? undefined,
					name: this.author.name,
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
					text: this.footer.text ?? undefined,
				}
				: undefined,
			image: this.image
				? {
					url: this.image.url ?? undefined,
				}
				: undefined,
			thumbnail: this.thumbnail
				? {
					url: this.thumbnail.url ?? undefined,
				}
				: undefined,
			timestamp: this.timestampString ?? undefined,
			title: this.title ?? undefined,
			url: this.url ?? undefined,
		};
	}
}

export interface APIEmbedMediaData {
	url: string;
}
