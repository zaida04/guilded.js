/* istanbul ignore file */

/* eslint-disable */

import type { Mentions } from "./Mentions";

export type CalendarEvent = {
  /**
   * The ID of the calendar event
   */
  id: number;
  /**
   * The ID of the server
   */
  serverId: string;
  /**
   * The ID of the channel
   */
  channelId: string;
  /**
   * The name of the event
   */
  name: string;
  /**
   * The description of the event
   */
  description?: string;
  /**
   * The location of the event
   */
  location?: string;
  /**
   * A URL to associate with the event
   */
  url?: string;
  /**
   * The integer value corresponds to the decimal RGB representation for the color. The color of the event when viewing in the calendar
   */
  color?: number;
  /**
   * Is this event a repeating event
   */
  repeats?: boolean;
  /**
   * The ID of the calendar event series. Only shows if the event is repeating
   */
  seriesId?: string;
  /**
   * The role IDs to restrict the event to
   */
  roleIds?: Array<number>;
  /**
   * When disabled, users will not be able to RSVP to the event
   */
  rsvpDisabled?: boolean;
  /**
   * Does the event last all day
   */
  isAllDay?: boolean;
  /**
   * The number of RSVPs to allow before waitlisting RSVPs
   */
  rsvpLimit?: number;
  /**
   * When `rsvpLimit` is set, users from the waitlist will be added as space becomes available in the event
   */
  autofillWaitlist?: boolean;
  /**
   * The ISO 8601 timestamp that the event starts at
   */
  startsAt: string;
  /**
   * The duration of the event _**in minutes**_
   */
  duration?: number;
  isPrivate?: boolean;
  mentions?: Mentions;
  /**
   * The ISO 8601 timestamp that the event was created at
   */
  createdAt: string;
  /**
   * The ID of the user who created this event
   */
  createdBy: string;
  cancellation?: {
    /**
     * The description of event cancellation
     */
    description?: string;
    /**
     * The ID of the user who created this event cancellation
     */
    createdBy: string;
  };
};
