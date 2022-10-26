import type { WSBotTeamMembershipCreated } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { Server } from "../../structures/Server";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class BotEventHandler extends GatewayEventHandler {
    botTeamMembershipCreated(data: WSBotTeamMembershipCreated): boolean {
        const server = this.client.servers.cache.get(data.d.server.id)?._update(data.d.server) ?? new Server(this.client, data.d.server);
        const user = this.client.users.cache.get(data.d.createdBy) ?? data.d.createdBy;
        return this.client.emit(constants.clientEvents.BOT_SERVER_CREATED, server, user);
    }
}
