import type { WSPacket } from "@guildedjs/api";
import { constants } from "../../constants";
import { Server } from "../../structures/Server";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class BotEventHandler extends GatewayEventHandler {
	botServerMembershipCreated(data: WSPacket<"BotServerMembershipCreated">): boolean {
		const server = this.client.servers.cache.get(data.d.server.id)?._update(data.d.server) ?? new Server(this.client, data.d.server);

		return this.client.emit(constants.clientEvents.BOT_SERVER_CREATED, server, data.d.createdBy);
	}

	botServerMembershipDeleted(data: WSPacket<"BotServerMembershipDeleted">): boolean {
		const server = this.client.servers.cache.get(data.d.server.id)?._update(data.d.server) ?? new Server(this.client, data.d.server);

		return this.client.emit(constants.clientEvents.BOT_SERVER_DELETED, server, data.d.deletedBy);
	}
}
