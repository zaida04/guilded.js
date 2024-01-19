import { Collection } from "@discordjs/collection";
import type { CalendarEventPayload, CalendarEventRsvpPayload, MentionsPayload } from "@guildedjs/api";
import { parseToStamp } from "../util";
import { Base } from "./Base";
import type { Client } from "./Client";
import type { User } from "./User";

/**
 * Represents a calendar event on Guilded
 */
export class CalendarEvent extends Base<CalendarEventPayload, number> {
	/** The ID of the calendar event (min 1) */
	readonly id: number;

	/** The ID of the server */
	readonly serverId: string;

	/** The ID of the channel */
	readonly channelId: string;

	/** The name of the event (min length 1; max length 60) */
	name: string;

	/**  The description of the event (min length 1; max length 8000) */
	description?: string | null;

	/** The location of the event (min length 1; max length 8000) */
	location?: string | null;

	/** A URL to associate with the event */
	url?: string | null;

	/** The color of the event when viewing in the calendar (min 0; max 16777215) */
	color?: number | null;

	/** The ISO 8601 timestamp that the event starts at */
	startsAt: string;

	/** The duration of the event in minutes (min 1) */
	duration?: number | null;

	/** Whether this event is private or not */
	isPrivate?: boolean;

	/** The mentions in this calendar event */
	mentions?: MentionsPayload;

	/** The cancellations for this event */
	cancellation?: CalendarEventPayload["cancellation"];

	/** The number of rsvps to allow before waitlisting rsvps (min 1) */
	rsvpLimit?: number | null;

	/** A collection of cached rsvps for this calendar event */
	rsvps: Collection<string, CalendarEventRsvp>;

	/** The role IDs to restrict the event to (min items 1; must have unique items true) */
	roleIds?: number[] | null;

	/** The ID of the calendar event series. Only shows if the event is repeating */
	seriesId?: string | null;

	/** Whether this event is repeating */
	repeats?: boolean | null;

	/** Whether this event lasts all day */
	isAllDay?: boolean | null;

	/** When rsvpLimit is set, users from the waitlist will be added as space becomes available in the event */
	autofillWaitlist?: boolean | null;

	/** The ISO 8601 timestamp that the event was created at */
	readonly _createdAt: number;

	/** The ID of the user who created this event */
	readonly createdBy: string;

	constructor(client: Client, data: CalendarEventPayload) {
		super(client, data);

		this.id = data.id;
		this.serverId = data.serverId;
		this.channelId = data.channelId;
		this.name = data.name;
		this.description = data.description ?? null;
		this.location = data.location ?? null;
		this.url = data.url ?? null;
		this.color = data.color ?? null;
		this.startsAt = data.startsAt;
		this.duration = data.duration ?? null;
		this.isPrivate = data.isPrivate ?? false;
		this._createdAt = parseToStamp(data.createdAt)!;
		this.createdBy = data.createdBy;
		this.rsvpLimit = data.rsvpLimit ?? null;
		this.rsvps = new Collection();
		this.roleIds = data.roleIds ?? null;
		this.seriesId = data.seriesId ?? null;
		this.repeats = data.repeats ?? null;
		this.isAllDay = data.isAllDay ?? null;
		this.autofillWaitlist = data.autofillWaitlist ?? null;

		this._update(data);
	}

	/**
	 * Get the author of this calendar event
	 *
	 * @returns The author of this calendar event or null if the author is not cached
	 */
	get author(): User | null {
		return this.client.users.cache.get(this.createdBy) ?? null;
	}

	/**
	 * Get the date this calendar event was created
	 *
	 * @returns The date this calendar event was created
	 */
	get createdAt(): Date {
		return new Date(this._createdAt);
	}

	_update(data: Partial<CalendarEventPayload>): this {
		if ("name" in data && typeof data.name !== "undefined") {
			this.name = data.name;
		}

		if ("description" in data && typeof data.description !== "undefined") {
			this.description = data.description;
		}

		if ("url" in data && typeof data.url !== "undefined") {
			this.url = data.url;
		}

		if ("color" in data && typeof data.color !== "undefined") {
			this.color = data.color;
		}

		if ("startsAt" in data && typeof data.startsAt !== "undefined") {
			this.startsAt = data.startsAt;
		}

		if ("duration" in data && typeof data.duration !== "undefined") {
			this.duration = data.duration;
		}

		if ("isPrivate" in data && typeof data.isPrivate !== "undefined") {
			this.isPrivate = data.isPrivate;
		}

		if ("mentions" in data && typeof data.mentions !== "undefined") {
			this.mentions = data.mentions;
		}

		if ("cancellation" in data && typeof data.cancellation !== "undefined") {
			this.cancellation = data.cancellation;
		}

		if ("rsvpLimit" in data && typeof data.rsvpLimit !== "undefined") {
			this.rsvpLimit = data.rsvpLimit ?? null;
		}

		return this;
	}
}

/**
 * Represents a calendar event RSVP
 */
export class CalendarEventRsvp extends Base<CalendarEventRsvpPayload, string> {
	/** The ID of the calendar event (min 1) */
	readonly calendarEventId: number;

	/** The ID of the channel */
	readonly channelId: string;

	/** The ID of the server */
	readonly serverId: string;

	/** The ID of the user */
	readonly userId: string;

	/** The status of the rsvp ("going", "maybe", "declined", "invited", "waitlisted", or "not responded") */
	status: string;

	/** The ID of the user who created this rsvp */
	readonly createdBy: string;

	/** The ISO 8601 timestamp that the rsvp was created at */
	readonly _createdAt: number;

	/** The ID of the user who updated this rsvp */
	updatedBy?: string | null;

	/** The ISO 8601 timestamp that the rsvp was updated at, if relevant */
	updatedAt?: string | null;

	constructor(client: Client, data: CalendarEventRsvpPayload) {
		super(client, {
			...data,
			id: `${data.calendarEventId.toString()}-${data.userId}`,
		});

		this.calendarEventId = data.calendarEventId;
		this.channelId = data.channelId;
		this.serverId = data.serverId;
		this.userId = data.userId;
		this.status = data.status;
		this.createdBy = data.createdBy;
		this._createdAt = parseToStamp(data.createdAt)!;
		this.updatedBy = null;
		this.updatedAt = null;

		this._update(data);
	}

	get author(): User | null {
		return this.client.users.cache.get(this.createdBy) ?? null;
	}

	get createdAt(): Date {
		return new Date(this._createdAt);
	}

	_update(data: Partial<CalendarEventRsvpPayload>): this {
		if ("updatedAt" in data && typeof data.updatedAt !== "undefined") {
			this.updatedAt = data.updatedAt ?? null;
		}

		if ("updatedBy" in data && typeof data.updatedBy !== "undefined") {
			this.updatedBy = data.updatedBy ?? null;
		}

		if ("status" in data && typeof data.status !== "undefined") {
			this.status = data.status;
		}

		return this;
	}
}
