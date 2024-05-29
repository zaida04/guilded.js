/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ServerChannel = {
	/**
	 * The ID of the channel
	 */
	id: string;
	/**
	 * The type of channel. This will determine what routes to use for creating content in a channel. For example, if this "chat", then one must use the routes for creating channel messages
	 */
	type: "announcements" | "chat" | "calendar" | "forums" | "media" | "docs" | "voice" | "list" | "scheduling" | "stream";
	/**
	 * The name of the channel
	 */
	name: string;
	/**
	 * The topic of the channel. Not applicable to threads
	 */
	topic?: string;
	/**
	 * The ISO 8601 timestamp that the channel was created at
	 */
	createdAt: string;
	/**
	 * The ID of the user who created this channel
	 */
	createdBy: string;
	/**
	 * The ISO 8601 timestamp that the channel was updated at, if relevant
	 */
	updatedAt?: string;
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * ID of the **root** channel or thread in the channel hierarchy. Only applicable to "chat", "voice", and "stream" channels and indicates that this channel is a thread, if present
	 */
	rootId?: string;
	/**
	 * ID of the **immediate** parent channel or thread in the channel hierarchy. Only applicable to "chat", "voice", and "stream" channels and indicates that this channel is a thread, if present
	 */
	parentId?: string;
	/**
	 * The ID of the message that this channel was created off of. Only applicable to "chat", "voice", and "stream" channels and indicates that this channel is a thread, if present
	 */
	messageId?: string;
	/**
	 * The category that the channel exists in. Only relevant for server channels
	 */
	categoryId?: number;
	/**
	 * The ID of the group
	 */
	groupId: string;
	/**
	 * What users can access the channel. Only applicable to server channels. If not present, this channel will respect normal permissions. `public` is accessible to everyone, even those who aren't of the server. `private` is only accessible to explicitly mentioned users. Currently, threads cannot be `public` and other channels cannot be `private`. Additionally, `private` threads can only exist with an associated `messageId` that is for a private message
	 */
	visibility?: "private" | "public" | null;
	/**
	 * The ID of the user who archived this channel
	 */
	archivedBy?: string;
	/**
	 * The ISO 8601 timestamp that the channel was archived at, if relevant
	 */
	archivedAt?: string;
	/**
	 * The priority of the channel will determine its position relative to other categories in the group. The higher the value, the higher up it will be displayed in the UI. Returned values can be null, in which case sorting will be done by `createdAt` in ascending order. Due to legacy issues, sending a null value is not possible
	 */
	priority?: number;
};
