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

export interface WebhookContentPayload {
    id: string;
    channelId: string;
    content: APIContent;
    type: string;
    createdBy: string;
    createdAt: string;
    webhookId: string;
    botId: string | null;
}

export interface APIContent {
    object: string;
    document: APIDocument;
}

interface APILeaf {
    text: string;
    marks: APIMark[];
    object: "leaf" | string;
}

interface APIMark {
    data: unknown;
    type: string;
    object: string;
}

interface APIDocument {
    data: unknown;
    nodes: APIDocumentNode[];
    object: string;
}

interface APIDocumentNode {
    data: unknown;
    type: string;
    nodes: APINestedNode[];
    object: string;
}

interface APINestedNode {
    leaves?: APILeaf[];
    object: string;
    data?: unknown;
    type?: string;
    nodes?: APINestedNode[];
}
