import type { WSPacket } from "@guildedjs/api";
import { constants } from "../../constants";
import type { DocChannel } from "../../structures";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class DocEventHandler extends GatewayEventHandler {
    docCreated(data: WSPacket<"DocCreated">): boolean {
        const existingChannel = this.client.channels.cache.get(data.d.doc.channelId) as DocChannel | undefined;
        if (existingChannel) existingChannel.docs.set(data.d.doc.id, data.d.doc);
        return this.client.emit(constants.clientEvents.DOC_CREATED, data.d.doc);
    }

    docUpdated(data: WSPacket<"DocUpdated">): boolean {
        const existingChannel = this.client.channels.cache.get(data.d.doc.channelId) as DocChannel | undefined;
        const existingDoc = existingChannel?.docs.get(data.d.doc.id);
        if (existingChannel) existingChannel.docs.set(data.d.doc.id, data.d.doc);
        return this.client.emit(constants.clientEvents.DOC_UPDATED, data.d.doc, existingDoc ?? null);
    }

    docDeleted(data: WSPacket<"DocDeleted">): boolean {
        const existingChannel = this.client.channels.cache.get(data.d.doc.channelId) as DocChannel | undefined;
        if (existingChannel) existingChannel.docs.set(data.d.doc.id, data.d.doc);
        return this.client.emit(constants.clientEvents.DOC_DELETED, data.d.doc);
    }
}
