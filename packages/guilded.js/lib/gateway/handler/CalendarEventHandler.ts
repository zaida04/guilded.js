import type {
  WSCalendarEventCreated,
  WSCalendarEventDeleted,
  WSCalendarEventUpdated,
  WSCalendarEventRsvpUpdated,
  WSCalendarEventRsvpManyUpdated,
  WSCalendarEventRsvpDeleted,
} from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import {
  CalendarEvent,
  CalendarEventRsvp,
} from "../../structures/CalendarEvent";
import { GatewayEventHandler } from "./GatewayEventHandler";
import { Collection } from "@discordjs/collection";

export class CalendarEventHandler extends GatewayEventHandler {
  calendarEventCreated(data: WSCalendarEventCreated): boolean {
    const existingCalendar = this.client.calendars.cache.get(
      data.d.calendarEvent.id
    );
    if (existingCalendar)
      return this.client.emit(
        constants.clientEvents.CALENDAR_EVENT_CREATED,
        existingCalendar
      );

    const newCalendarEvent = new CalendarEvent(
      this.client,
      data.d.calendarEvent
    );
    if (this.client.calendars.shouldCacheCalendar)
      this.client.calendars.cache.set(newCalendarEvent.id, newCalendarEvent);
    return this.client.emit(
      constants.clientEvents.CALENDAR_EVENT_CREATED,
      newCalendarEvent
    );
  }

  calendarEventUpdated(data: WSCalendarEventUpdated): boolean {
    const existingCalendar = this.client.calendars.cache.get(
      data.d.calendarEvent.id
    );
    const oldCalendar = existingCalendar?._clone();
    const updatedCalendar =
      existingCalendar?._update(data.d.calendarEvent) ??
      new CalendarEvent(this.client, data.d.calendarEvent);
    if (this.client.calendars.shouldCacheCalendar && !existingCalendar)
      this.client.calendars.cache.set(updatedCalendar.id, updatedCalendar);
    return this.client.emit(
      constants.clientEvents.CALENDAR_EVENT_UPDATED,
      updatedCalendar,
      oldCalendar ?? null
    );
  }

  calendarEventDeleted(data: WSCalendarEventDeleted): boolean {
    const existingCalendar = this.client.calendars.cache.get(
      data.d.calendarEvent.id
    );
    const deletedCalendar =
      existingCalendar?._update(data.d.calendarEvent) ??
      new CalendarEvent(this.client, data.d.calendarEvent);
    if (this.client.options.cache?.removeCalendarsOnDelete)
      this.client.calendars.cache.delete(deletedCalendar.id);
    return this.client.emit(
      constants.clientEvents.CALENDAR_EVENT_DELETED,
      deletedCalendar
    );
  }
}

export class CalendarEventRsvpHandler extends GatewayEventHandler {
  calendarEventRsvpUpdated(data: WSCalendarEventRsvpUpdated): boolean {
    const existingCalendar = this.client.calendars.cache.get(
      data.d.calendarEventRsvp.calendarEventId
    );
    const existingCalendarRsvp = existingCalendar?.rsvps?.get(
      data.d.calendarEventRsvp.userId
    );
    const oldCalendarRsvp = existingCalendarRsvp?._clone();
    const updatedCalendarRsvp =
      existingCalendarRsvp?._update(data.d.calendarEventRsvp) ??
      new CalendarEventRsvp(this.client, data.d.calendarEventRsvp);
    if (
      this.client.calendars.shouldCacheCalendar &&
      this.client.calendars.shouldCacheCalendarRsvps &&
      !existingCalendarRsvp
    )
      existingCalendar?.rsvps?.set(
        updatedCalendarRsvp.userId,
        updatedCalendarRsvp
      );
    return this.client.emit(
      constants.clientEvents.CALENDAR_EVENT_RSVP_UPDATED,
      updatedCalendarRsvp,
      oldCalendarRsvp ?? null
    );
  }

  calendarEventRsvpManyUpdated(data: WSCalendarEventRsvpManyUpdated): boolean {
    const rsvpCollection = new Collection<string, CalendarEventRsvp>();
    for (const rsvp of data.d.calendarEventRsvps) {
      const existingCalendar = this.client.calendars.cache.get(
        rsvp.calendarEventId
      );
      const existingCalendarRsvp = existingCalendar?.rsvps?.get(rsvp.userId);
      const newCalendarRsvp =
        existingCalendarRsvp?._update(rsvp) ??
        new CalendarEventRsvp(this.client, rsvp);
      rsvpCollection.set(rsvp.userId, newCalendarRsvp);
      if (
        this.client.calendars.shouldCacheCalendar &&
        this.client.calendars.shouldCacheCalendarRsvps &&
        !existingCalendarRsvp
      ) {
        existingCalendar?.rsvps?.set(rsvp.userId, newCalendarRsvp);
      }
    }
    return this.client.emit(
      constants.clientEvents.CALENDAR_EVENT_RSVP_MANY_UPDATED,
      rsvpCollection
    );
  }

  calendarEventRsvpDeleted(data: WSCalendarEventRsvpDeleted): boolean {
    const existingCalendar = this.client.calendars.cache.get(
      data.d.calendarEventRsvp.calendarEventId
    );
    const existingCalendarRsvp = existingCalendar?.rsvps?.get(
      data.d.calendarEventRsvp.userId
    );
    const deletedCalendarRsvp =
      existingCalendarRsvp?._update(data.d.calendarEventRsvp) ??
      new CalendarEventRsvp(this.client, data.d.calendarEventRsvp);
    if (this.client.options.cache?.removeCalendarRsvpOnDelete) {
      const currentCalendar = this.client.calendars.cache.get(
        data.d.calendarEventRsvp.calendarEventId
      );
      currentCalendar?.rsvps?.delete(data.d.calendarEventRsvp.userId);
    }
    return this.client.emit(
      constants.clientEvents.CALENDAR_EVENT_RSVP_DELETED,
      deletedCalendarRsvp
    );
  }
}
