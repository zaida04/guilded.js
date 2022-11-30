export type UserPayload = {
    avatar?: string;
    banner?: string;
    createdAt: string;
    id: string;
    name: string;
    type?: "bot" | "user";
}

export type UserSummaryPayload = {
    avatar?: string;
    id: string;
    name: string;
    type?: string;
}
