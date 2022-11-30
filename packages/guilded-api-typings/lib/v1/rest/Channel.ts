import type { ChannelType, ServerChannelPayload } from "../structs/Channel";

export type RESTPostChannelsBody = {
    categoryId?: number;
    groupId?: string;
    isPublic?: boolean;
    name: string;
    serverId: string;
    topic?: string;
    type: ChannelType;
}

export type RESTPostChannelsResult = {
    channel: ServerChannelPayload;
}

export type RESTPatchChannelBody = Pick<RESTPostChannelsBody, "isPublic" | "topic"> & { name?: string };

export type RESTGetChannelResult = RESTPostChannelsResult;
export type RESTPatchChannelResult = RESTPostChannelsResult;
export type RESTDeleteChannelResult = never;
