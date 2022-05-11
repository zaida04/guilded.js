import type { ChannelType, ServerChannelPayload } from "../structs/Channel";

export interface RESTPostChannelsBody {
    name: string;
    topic?: string;
    isPublic?: boolean;
    type: ChannelType;
    serverId: string;
    groupId?: string;
    categoryId?: number;
}

export interface RESTPostChannelsResult {
    channel: ServerChannelPayload;
}

export type RESTPatchChannelBody = Pick<RESTPostChannelsBody, "topic" | "isPublic"> & { name?: string };

export type RESTGetChannelResult = RESTPostChannelsResult;
export type RESTPatchChannelResult = RESTPostChannelsResult;
export type RESTDeleteChannelResult = never;
