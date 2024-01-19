import type { GroupPayload } from "@guildedjs/api";
import { Base } from "./Base";
import type { Client } from "./Client";

/**
 * A group in a server in Guilded
 */
export class Group extends Base<GroupPayload> {
	/** The name of the group */
	public name!: string;

	/** The description of the group */
	public description!: string;

	/** The ID of the server this group is in */
	public serverId: string;

	/** The ID of the user who created this group */
	public createdBy: string;

	/** The date this group was created at */
	public createdAt: Date;

	/** The date this group was last updated at */
	public updatedAt!: Date;

	// Avatar of this group
	public avatar!: string;

	// Whether this is the main group in a server
	public isHome!: boolean;

	// ID of the emote for this group
	public emoteId!: number;

	// Whether this group is public
	public isPublic!: boolean;

	// ID of the user who last updated this group
	public updatedBy!: string;

	// Date this group was archived if it was archived
	public archivedAt!: Date | null;

	// ID of the user who archived this group if it was archived
	public archivedBy!: string | null;

	constructor(client: Client, data: GroupPayload) {
		super(client, data);
		this.serverId = data.serverId;
		this.createdAt = new Date(Date.parse(data.createdAt));
		this.createdBy = data.createdBy;

		this._update(data);
	}

	_update(data: GroupPayload): this {
		if (typeof data.name !== "undefined") this.name = data.name;
		if (typeof data.description !== "undefined") this.description = data.description;
		if (typeof data.updatedAt !== "undefined") this.updatedAt = new Date(Date.parse(data.updatedAt));
		if (typeof data.avatar !== "undefined") this.avatar = data.avatar;
		if (typeof data.isHome !== "undefined") this.isHome = data.isHome;
		if (typeof data.emoteId !== "undefined") this.emoteId = data.emoteId;
		if (typeof data.isPublic !== "undefined") this.isPublic = data.isPublic;
		if (typeof data.updatedBy !== "undefined") this.updatedBy = data.updatedBy;
		if (typeof data.archivedAt !== "undefined") this.archivedAt = data.archivedAt ? new Date(Date.parse(data.archivedAt)) : null;
		if (typeof data.archivedBy !== "undefined") this.archivedBy = data.archivedBy;

		return this;
	}

	/**
	 * Adds a member to the group.
	 *
	 * @param memberId The ID of the member to add.
	 * @returns A Promise that resolves with no result on success.
	 */
	addMember(memberId: string): Promise<void> {
		return this.client.groups.addMember(this.id, memberId);
	}

	/**
	 * Removes a member from the group.
	 *
	 * @param memberId The ID of the member to remove.
	 * @returns A Promise that resolves with no result on success.
	 */
	removeMember(memberId: string): Promise<void> {
		return this.client.groups.removeMember(this.id, memberId);
	}
}
