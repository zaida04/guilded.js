export interface UserPayload {
    id: string;
    type?: "bot" | "user";
    name: string;
    createdAt: string;
}

export interface UserSummary {
    id: string;
    type?: string;
    name: string;
}
