/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Emote } from "./Emote";
export type DocCommentReaction = {
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * The ID of the user who added the reaction
	 */
	createdBy: string;
	emote: Emote;
	/**
	 * The ID of the doc
	 */
	docId: number;
	/**
	 * The ID of the doc comment
	 */
	docCommentId: number;
};
