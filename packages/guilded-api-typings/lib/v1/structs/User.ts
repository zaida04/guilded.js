export interface UserPayload {
    id: string;
    type?: "bot" | "user";
    name: string;
    createdAt: string;
}

export interface UserSummaryPayload {
    id: string;
    type?: string;
    name: string;
}
