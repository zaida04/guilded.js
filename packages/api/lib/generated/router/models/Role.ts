/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Role = {
	/**
	 * The ID of the role
	 */
	id: number;
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The ISO 8601 timestamp that the role was created at
	 */
	createdAt: string;
	/**
	 * The ISO 8601 timestamp that the role was updated at, if relevant
	 */
	updatedAt?: string;
	/**
	 * The role's name
	 */
	name: string;
	/**
	 * If set, the role will be displayed separately in the channel member list
	 */
	isDisplayedSeparately?: boolean;
	/**
	 * If set, this roll will be self assigned
	 */
	isSelfAssignable?: boolean;
	/**
	 * If set, this role can be mentioned
	 */
	isMentionable?: boolean;
	/**
	 * Permissions must be a collection of valid permissions as defined in the [Enums/Permissions](https://www.guilded.gg/docs/api/Permissions) section
	 */
	permissions: Array<string>;
	/**
	 * An array of integer values corresponding to the decimal RGB representation for a color. The first color is solid, and a second color indicates a gradient
	 */
	colors?: Array<number>;
	/**
	 * The URL of the role icon
	 */
	icon?: string;
	/**
	 * The priority the role will be in relation to other roles in the server. The higher the value, the more precedence the role has over lower priority roles, and the higher up it will be displayed in the UI. Values can be zero or negative!
	 */
	priority?: number;
	/**
	 * The default role users are given when joining the server. Base roles are tied directly to the server and cannot be created or deleted
	 */
	isBase?: boolean;
	/**
	 * The bot user ID this role has been defined for. Roles with this populated can only be deleted by kicking the bot
	 */
	botUserId?: string;
};
