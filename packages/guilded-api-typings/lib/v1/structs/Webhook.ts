export type WebhookPayload = {
    channelId: string;
    createdAt: string;
    createdBy: string;
    deletedAt?: string;
    id: string;
    name: string;
    serverId: string;
    token?: string;
}

export type WebhookContentPayload = {
    botId: string | null;
    channelId: string;
    content: APIContent;
    createdAt: string;
    createdBy: string;
    id: string;
    type: string;
    webhookId: string;
}

export type APIContent = {
    document: APIDocument;
    object: string;
}

type APILeaf = {
    marks: APIMark[];
    object: string | "leaf";
    text: string;
}

type APIMark = {
    data: unknown;
    object: string;
    type: string;
}

type APIDocument = {
    data: unknown;
    nodes: APIDocumentNode[];
    object: string;
}

type APIDocumentNode = {
    data: unknown;
    nodes: APINestedNode[];
    object: string;
    type: string;
}

type APINestedNode = {
    data?: unknown;
    leaves?: APILeaf[];
    nodes?: APINestedNode[];
    object: string;
    type?: string;
}
