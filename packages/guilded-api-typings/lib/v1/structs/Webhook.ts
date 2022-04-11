export interface WebhookPayload {
    id: string;
    name: string;
    serverId: string;
    channelId: string;
    createdAt: string;
    createdBy: string;
    deletedAt?: string;
    token?: string;
}
