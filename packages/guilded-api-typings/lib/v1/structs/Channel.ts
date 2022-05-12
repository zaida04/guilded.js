export interface ServerChannelPayload {
    id: string;
    type: ChannelType;
    name: string;
    topic?: string;
    createdAt: string;
    createdBy: string;
    updatedAt?: string;
    serverId: string;
    parentId?: string;
    categoryId?: string;
    groupId: string;
    isPublic?: boolean;
    archivedBy?: string;
    archivedAt?: string;
}

export type ChannelType = "announcements" | "chat" | "calendar" | "forums" | "media" | "docs" | "voice" | "list" | "scheduling" | "stream";
