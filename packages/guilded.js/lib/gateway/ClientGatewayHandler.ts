import Base from "../structures/Base";
import Message from "../structures/Message";
import MessageEventHandler from "./handler/MessageEventHandler";
import TeamEventHandler from "./handler/TeamEventHandler";
import TeamMemberEventHandler from "./handler/TeamMemberEventHandler";

export class ClientGatewayHandler extends Base {
    public readonly messageHandler = new MessageEventHandler(this.client);
    public readonly teamHandler = new TeamEventHandler(this.client);
    public readonly teamMemberHandler = new TeamMemberEventHandler(this.client);
}
