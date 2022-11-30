export type ServerChannelPayload = {
    archivedAt?: string;
    archivedBy?: string;
    categoryId?: string;
    createdAt: string;
    createdBy: string;
    groupId: string;
    id: string;
    isPublic?: boolean;
    name: string;
    parentId?: string;
    serverId: string;
    topic?: string;
    type: ChannelType;
    updatedAt?: string;
}

export type ChannelType = "announcements" | "calendar" | "chat" | "docs" | "forums" | "list" | "media" | "scheduling" | "stream" | "voice";
