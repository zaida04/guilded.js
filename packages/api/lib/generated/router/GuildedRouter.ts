/* istanbul ignore file */

/* eslint-disable */
import { HttpRequest } from "./core/HttpRequest";

import { AnnouncementCommentsService } from "./services/AnnouncementCommentsService";
import { AnnouncementsService } from "./services/AnnouncementsService";
import { CalendarEventCommentsService } from "./services/CalendarEventCommentsService";
import { CalendarEventsService } from "./services/CalendarEventsService";
import { CalendarEventSeriesService } from "./services/CalendarEventSeriesService";
import { ChannelsService } from "./services/ChannelsService";
import { ChatService } from "./services/ChatService";
import { DocCommentsService } from "./services/DocCommentsService";
import { DocsService } from "./services/DocsService";
import { ForumCommentsService } from "./services/ForumCommentsService";
import { ForumsService } from "./services/ForumsService";
import { GroupMembershipService } from "./services/GroupMembershipService";
import { GroupsService } from "./services/GroupsService";
import { ListItemsService } from "./services/ListItemsService";
import { MemberBansService } from "./services/MemberBansService";
import { MembersService } from "./services/MembersService";
import { ReactionsService } from "./services/ReactionsService";
import { RoleMembershipService } from "./services/RoleMembershipService";
import { ServersService } from "./services/ServersService";
import { ServerXpService } from "./services/ServerXpService";
import { SocialLinksService } from "./services/SocialLinksService";
import { UsersService } from "./services/UsersService";
import { UserStatusService } from "./services/UserStatusService";
import { WebhookService } from "./services/WebhookService";
import { RestManager } from "../../rest/RestManager";

export class GuildedRouter {
  public readonly announcementComments: AnnouncementCommentsService;
  public readonly announcements: AnnouncementsService;
  public readonly calendarEventComments: CalendarEventCommentsService;
  public readonly calendarEvents: CalendarEventsService;
  public readonly calendarEventSeries: CalendarEventSeriesService;
  public readonly channels: ChannelsService;
  public readonly chat: ChatService;
  public readonly docComments: DocCommentsService;
  public readonly docs: DocsService;
  public readonly forumComments: ForumCommentsService;
  public readonly forums: ForumsService;
  public readonly groupMembership: GroupMembershipService;
  public readonly groups: GroupsService;
  public readonly listItems: ListItemsService;
  public readonly memberBans: MemberBansService;
  public readonly members: MembersService;
  public readonly reactions: ReactionsService;
  public readonly roleMembership: RoleMembershipService;
  public readonly servers: ServersService;
  public readonly serverXp: ServerXpService;
  public readonly socialLinks: SocialLinksService;
  public readonly users: UsersService;
  public readonly userStatus: UserStatusService;
  public readonly webhook: WebhookService;

  public readonly request: HttpRequest;

  constructor(rest: RestManager) {
    this.request = new HttpRequest(rest);

    this.announcementComments = new AnnouncementCommentsService(this.request);
    this.announcements = new AnnouncementsService(this.request);
    this.calendarEventComments = new CalendarEventCommentsService(this.request);
    this.calendarEvents = new CalendarEventsService(this.request);
    this.calendarEventSeries = new CalendarEventSeriesService(this.request);
    this.channels = new ChannelsService(this.request);
    this.chat = new ChatService(this.request);
    this.docComments = new DocCommentsService(this.request);
    this.docs = new DocsService(this.request);
    this.forumComments = new ForumCommentsService(this.request);
    this.forums = new ForumsService(this.request);
    this.groupMembership = new GroupMembershipService(this.request);
    this.groups = new GroupsService(this.request);
    this.listItems = new ListItemsService(this.request);
    this.memberBans = new MemberBansService(this.request);
    this.members = new MembersService(this.request);
    this.reactions = new ReactionsService(this.request);
    this.roleMembership = new RoleMembershipService(this.request);
    this.servers = new ServersService(this.request);
    this.serverXp = new ServerXpService(this.request);
    this.socialLinks = new SocialLinksService(this.request);
    this.users = new UsersService(this.request);
    this.userStatus = new UserStatusService(this.request);
    this.webhook = new WebhookService(this.request);
  }
}
