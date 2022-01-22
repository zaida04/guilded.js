import type { Client } from "../Client";
import MessageEventHandler from "./handler/MessageEventHandler";
import TeamEventHandler from "./handler/TeamEventHandler";
import TeamMemberEventHandler from "./handler/TeamMemberEventHandler";

export class ClientGatewayHandler {
    readonly messageHandler = new MessageEventHandler(this.client);
    readonly teamHandler = new TeamEventHandler(this.client);
    readonly teamMemberHandler = new TeamMemberEventHandler(this.client);
    constructor(public client: Client) {}
}
