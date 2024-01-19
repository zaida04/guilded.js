import type { CategoryPayload } from "@guildedjs/api";
import type { GlobalCategoryManager } from "../managers/global/CategoryManager";
import { parseToStamp } from "../util";
import { Base } from "./Base";
import type { Client } from "./Client";

export class Category extends Base<CategoryPayload, number> {
	/** The ID of the server this category is in. */
	serverId: string;

	/** The name of this category. */
	name!: string;

	/** The timestamp of when this category was created. */
	_createdAt: number;

	/** The ID of the group this category is in. */
	groupId: string;

	/** The timestamp of when this category was last updated. */
	_updatedAt!:
		| number
		| null;

	constructor(
		client: Client,
		data: CategoryPayload,
	) {
		super(
			client,
			data,
		);
		this.serverId =
			data.serverId;
		this._createdAt =
			parseToStamp(
				data.createdAt,
			)!;
		this.groupId =
			data.groupId;

		this._update(
			data,
		);
	}

	_update(
		data: CategoryPayload,
	): this {
		if (
			typeof data.name !==
			"undefined"
		)
			this.name =
				data.name;
		if (
			typeof data.updatedAt !==
			"undefined"
		)
			this._updatedAt =
				parseToStamp(
					data.updatedAt,
				);

		return this;
	}

	/**
	 * Gets the creation date of this category.
	 *
	 * @returns The creation date of this category.
	 */
	get createdAt(): Date {
		return new Date(
			this
				._createdAt,
		);
	}

	/**
	 * Gets the last time this category was updated.
	 *
	 * @returns The last time this category was updated.
	 */
	get updatedAt(): Date | null {
		return this
			._updatedAt
			? new Date(
					this
						._updatedAt,
			  )
			: null;
	}

	/**
	 * Updates this webhook with new options
	 *
	 * @param options The new options for this webhook
	 * @returns A promise that resolves with the updated webhook
	 */
	update(
		options: Parameters<
			GlobalCategoryManager["update"]
		>[2],
	): Promise<Category | null> {
		return this.client.categories.update(
			this
				.serverId,
			this
				.id,
			options,
		);
	}

	/**
	 * Delete this category.
	 *
	 * @returns A Promise that resolves with the updated category.
	 */
	async delete(): Promise<void> {
		return this.client.categories.delete(
			this
				.serverId,
			this
				.id,
		);
	}
}
