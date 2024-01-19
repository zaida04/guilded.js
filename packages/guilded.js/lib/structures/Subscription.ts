import type { ServerSubscriptionTierPayload } from "@guildedjs/api";
import { parseToStamp } from "../util";
import { Base } from "./Base";
import type { Client } from "./Client";

/**
 * Describes a subscription tier type.
 */
export type ServerSubscriptionTierType = "Copper" | "Gold" | "Silver";

/**
 * Represents a Guilded SubscriptionTier in a server.
 */
export class ServerSubscriptionTier extends Base<ServerSubscriptionTierPayload, ServerSubscriptionTierType> {
	/** The ID of the server */
	readonly serverId: string;

	/** The ISO 8601 timestamp that the server subscription tier was created at */
	_createdAt: number;

	/** The type of the server subscription tier. This field is case sensitive!! */
	type: ServerSubscriptionTierType;

	/** The description associated with the server subscription tier (max length 256) */
	description:
		| string
		| null;

	/** The ID of the role */
	roleId:
		| number
		| null;

	/** The cost of the tier in cents USD per month (min 200; max 10000) */
	cost: number;

	/**
	 * @param client The client instance
	 * @param data The data for this role
	 */
	constructor(
		client: Client,
		data: ServerSubscriptionTierPayload,
	) {
		super(
			client,
			{
				id: data.type,
				...data,
			},
		);
		this.serverId =
			data.serverId;
		this._createdAt =
			parseToStamp(
				data.createdAt,
			)!;
		this.description =
			data.description ??
			null;
		this.roleId =
			data.roleId ??
			null;
		this.cost =
			data.cost;
		this.type =
			data.type;
	}

	get createdAt(): Date {
		return new Date(
			this
				._createdAt,
		);
	}
}
