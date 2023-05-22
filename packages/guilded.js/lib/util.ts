import { DOMAINS, EmbedPayload } from "@guildedjs/api";
import { Embed } from "./structures/Embed";
import type { MessageContent } from "./typings";

/**
 * Valid image file extensions
 */
export enum IMG_EXTENSION {
	PNG = "png",
	GIF = "gif",
	WEBP = "webp",
}

/**
 * Options for image size
 */
export type IMG_SIZE = "Small" | "Medium" | "Large";

/**
 * Function to build a Guilded asset URL
 * @param route - The API route for the asset
 * @param hash - The hash of the asset
 * @param extension - The file extension of the asset
 * @param width - The width of the asset (optional)
 * @param height - The height of the asset (optional)
 * @param size - The size of the asset (optional)
 * @returns A URL string for the asset
 */
const formAssetURL = (
	route: string,
	hash: string,
	extension: string,
	width?: number,
	height?: number,
	size?: string
): string => {
	const url = new URL(
		`https://${DOMAINS.IMAGE_CDN_DOMAIN
		}/${route}/${hash}-${size}.${extension.toLowerCase()}`
	);
	if (width) url.searchParams.append("w", width.toString());
	if (height) url.searchParams.append("h", height.toString());
	return url.toString();
};

/**
 * Object containing functions to build Guilded asset URLs
 */
export const ASSET_BUILDER = {
	/**
	 * Function to build a Guilded user avatar URL
	 * @param hash - The hash of the user's avatar
	 * @param size - The size of the avatar (optional)
	 * @returns A URL string for the user avatar
	 */
	AVATAR_URL: (hash: string, size: IMG_SIZE = "Medium"): string =>
		formAssetURL(
			"UserAvatar",
			hash,
			IMG_EXTENSION.PNG,
			undefined,
			undefined,
			size
		),
	/**
	 * Function to build a Guilded chat message image URL
	 * @param hash - The hash of the image
	 * @param size - The size of the image (optional)
	 * @param width - The width of the image (optional)
	 * @param height - The height of the image (optional)
	 * @returns A URL string for the image in a chat message
	 */
	IMAGE_IN_CHAT: (
		hash: string,
		size = "Full",
		width?: number,
		height?: number
	): string =>
		formAssetURL("ContentMedia", hash, IMG_EXTENSION.WEBP, width, height, size),
	/**
	 * Function to build a Guilded user profile banner URL
	 * @param hash - The hash of the user's banner
	 * @param size - The size of the banner (optional)
	 * @param width - The width of the banner (optional)
	 * @param height - The height of the banner (optional)
	 * @returns A URL string for the user profile banner
	 */
	PROFILE_BANNER: (
		hash: string,
		size = "Hero",
		width?: number,
		height?: number
	): string =>
		formAssetURL("UserBanner", hash, IMG_EXTENSION.PNG, width, height, size),
	/**
	 * Builds a URL for a server banner asset.
	 *
	 * @param hash - The hash of the banner asset.
	 * @param size - The size of the banner asset. Default value is "Hero".
	 * @param width - The width of the banner asset. Defaults to undefined.
	 * @param height - The height of the banner asset. Defaults to undefined.
	 *
	 * @returns The URL of the server banner asset.
	 */
	SERVER_BANNER: (
		hash: string,
		size = "Hero",
		width?: number,
		height?: number
	): string =>
		formAssetURL("TeamBanner", hash, IMG_EXTENSION.PNG, width, height, size),
	/**
	 * Builds a URL for a server emoji asset.
	 *
	 * @param hash - The hash of the emoji asset.
	 * @param size - The size of the emoji asset. Default value is "Full".
	 * @param extension - The extension of the emoji asset. Default value is "WEBP".
	 * @param width - The width of the emoji asset. Defaults to undefined.
	 * @param height - The height of the emoji asset. Defaults to undefined.
	 *
	 * @returns The URL of the server emoji asset.
	 */
	SERVER_EMOJI: (
		hash: string,
		size = "Full",
		extension: "WEBP" | "APNG" = "WEBP",
		width?: number,
		height?: number
	): string =>
		formAssetURL(
			"CustomReaction",
			hash,
			extension.toLowerCase(),
			width,
			height,
			size
		),
	/**
	 * Builds a URL for a server icon asset.
	 *
	 * @param hash - The hash of the icon asset.
	 * @param size - The size of the icon asset. Default value is "Medium".
	 *
	 * @returns The URL of the server icon asset.
	 */
	SERVER_ICON: (
		hash: string,
		size: "Small" | "Medium" | "Large" = "Medium"
	): string =>
		formAssetURL(
			"TeamAvatar",
			hash,
			IMG_EXTENSION.PNG,
			undefined,
			undefined,
			size
		),
};

/**
 * Builds a key for a member object in a server for use in cache management.
 *
 * @param serverId - The ID of the server.
 * @param memberId - The ID of the member.
 *
 * @returns The key for the member object.
 */
export const buildMemberKey = (serverId: string, memberId: string): string => {
	return `${serverId}:${memberId}`;
};

/**
 * Builds a key for a reaction object in a message for use in cache management.
 *
 * @param messageId - The ID of the message.
 * @param userId - The ID of the user.
 * @param emoteId - The ID of the emote.
 *
 * @returns The key for the reaction object.
 */
export const buildMessageReactionKey = (
	messageId: string,
	userId: string,
	emoteId: number
) => {
	return `${messageId}:${userId}:${emoteId}`;
};

/**
 * Builds a key for a reaction object.
 *
 * @param userId - The ID of the user.
 * @param emoteId - The ID of the emote.
 *
 * @returns The key for the reaction object.
 */
export const buildReactionKey = (userId: string, emoteId: number) => {
	return `${userId}:${emoteId}`;
};

export const buildCalendarRsvpKey = (calendarEventId: number, userId: string) => {
	return `${calendarEventId}:${userId}`
}

/**
 * Resolves message content to REST message data.
 *
 * @param content - The content of the message. Can be a string or an instance of an Embed object.
 *
 * @returns REST message data.
 */
export const resolveContentToData = (
	content: MessageContent
): { content?: string, embeds?: EmbedPayload[] } => {
	if (typeof content === "string") return { content };
	if (content instanceof Embed) return { embeds: [content.toJSON()] };

	return {
		...content,
		embeds: content.embeds?.map((x) => (x instanceof Embed ? x.toJSON() : x)),
	};
};
