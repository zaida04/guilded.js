import type { WSDocCreated, WSDocUpdated, WSDocDeleted } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import type { DocChannel } from "../../structures";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class DocEventHandler extends GatewayEventHandler {
    docCreated(data: WSDocCreated) {
        const existingChannel = this.client.channels.cache.get(data.d.doc.channelId) as DocChannel | undefined;
        if (existingChannel) existingChannel.docs.set(data.d.doc.id, data.d.doc);
        return this.client.emit(constants.clientEvents.DOC_CREATED, data.d.doc);
    }
    docUpdated(data: WSDocUpdated) {
        const existingChannel = this.client.channels.cache.get(data.d.doc.channelId) as DocChannel | undefined;
        const existingDoc = existingChannel?.docs.get(data.d.doc.id);
        if (existingChannel) existingChannel.docs.set(data.d.doc.id, data.d.doc);
        return this.client.emit(constants.clientEvents.DOC_UPDATED, data.d.doc, existingDoc ?? null);
    }
    docDeleted(data: WSDocDeleted) {
        const existingChannel = this.client.channels.cache.get(data.d.doc.channelId) as DocChannel | undefined;
        if (existingChannel) existingChannel.docs.set(data.d.doc.id, data.d.doc);
        return this.client.emit(constants.clientEvents.DOC_DELETED, data.d.doc);
    }
}
