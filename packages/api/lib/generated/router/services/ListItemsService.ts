/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListItem } from "../models/ListItem";
import type { ListItemSummary } from "../models/ListItemSummary";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class ListItemsService {
	constructor(
		public readonly httpRequest: BaseHttpRequest,
	) {}

	/**
	 * Create a list item
	 * @returns any Success
	 * @throws ApiError
	 */
	public listItemCreate({
		channelId,
		requestBody,
	}: {
		channelId: string;
		requestBody: {
			/**
			 * The message of the list item
			 */
			message:
				| Record<
						string,
						any
				  >
				| string;
			note?: {
				/**
				 * The note of the list item
				 */
				content:
					| Record<
							string,
							any
					  >
					| string;
			};
		};
	}): CancelablePromise<{
		listItem: ListItem;
	}> {
		return this.httpRequest.request(
			{
				method: "POST",
				url: "/channels/{channelId}/items",
				path: {
					channelId: channelId,
				},
				body: requestBody,
				mediaType: "application/json",
			},
		);
	}

	/**
	 * Get list items within a channel
	 * @returns any Success
	 * @throws ApiError
	 */
	public listItemReadMany({
		channelId,
	}: {
		channelId: string;
	}): CancelablePromise<{
		listItems: Array<ListItemSummary>;
	}> {
		return this.httpRequest.request(
			{
				method: "GET",
				url: "/channels/{channelId}/items",
				path: {
					channelId: channelId,
				},
			},
		);
	}

	/**
	 * Get a list item
	 * @returns any Success
	 * @throws ApiError
	 */
	public listItemRead({
		channelId,
		listItemId,
	}: {
		channelId: string;
		listItemId: string;
	}): CancelablePromise<{
		listItem: ListItem;
	}> {
		return this.httpRequest.request(
			{
				method: "GET",
				url: "/channels/{channelId}/items/{listItemId}",
				path: {
					channelId: channelId,
					listItemId: listItemId,
				},
			},
		);
	}

	/**
	 * Update a list item
	 * @returns any Success
	 * @throws ApiError
	 */
	public listItemUpdate({
		channelId,
		listItemId,
		requestBody,
	}: {
		channelId: string;
		listItemId: string;
		requestBody: {
			/**
			 * The message of the list item
			 */
			message?: string;
			note?: {
				/**
				 * The note of the list item
				 */
				content: string;
			} | null;
		};
	}): CancelablePromise<{
		listItem: ListItem;
	}> {
		return this.httpRequest.request(
			{
				method: "PATCH",
				url: "/channels/{channelId}/items/{listItemId}",
				path: {
					channelId: channelId,
					listItemId: listItemId,
				},
				body: requestBody,
				mediaType: "application/json",
			},
		);
	}

	/**
	 * Delete a list item
	 * @returns void
	 * @throws ApiError
	 */
	public listItemDelete({
		channelId,
		listItemId,
	}: {
		channelId: string;
		listItemId: string;
	}): CancelablePromise<void> {
		return this.httpRequest.request(
			{
				method: "DELETE",
				url: "/channels/{channelId}/items/{listItemId}",
				path: {
					channelId: channelId,
					listItemId: listItemId,
				},
			},
		);
	}

	/**
	 * Complete a list item
	 * @returns void
	 * @throws ApiError
	 */
	public listItemCompleteCreate({
		channelId,
		listItemId,
	}: {
		channelId: string;
		listItemId: string;
	}): CancelablePromise<void> {
		return this.httpRequest.request(
			{
				method: "POST",
				url: "/channels/{channelId}/items/{listItemId}/complete",
				path: {
					channelId: channelId,
					listItemId: listItemId,
				},
			},
		);
	}

	/**
	 * Uncomplete a list item
	 * @returns void
	 * @throws ApiError
	 */
	public listItemCompleteDelete({
		channelId,
		listItemId,
	}: {
		channelId: string;
		listItemId: string;
	}): CancelablePromise<void> {
		return this.httpRequest.request(
			{
				method: "DELETE",
				url: "/channels/{channelId}/items/{listItemId}/complete",
				path: {
					channelId: channelId,
					listItemId: listItemId,
				},
			},
		);
	}
}
