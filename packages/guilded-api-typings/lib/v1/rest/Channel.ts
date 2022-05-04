import type { ChannelType, ServerChannelPayload } from "../structs/Channel";

export interface RESTPostChannelsBody {
    name?: string;
    topic?: string;
    isPublic?: boolean;
    type?: ChannelType;
    serverId?: string;
    groupId?: string;
    categoryId?: number;
}

export interface RESTPostChannelsResult {
    channel: ServerChannelPayload;
}

export type RESTGetChannelResult = RESTPostChannelsResult;
export type RESTDeleteChannelResult = never;
