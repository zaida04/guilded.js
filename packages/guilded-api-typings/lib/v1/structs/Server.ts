export type ServerPayload = {
    about?: string;
    avatar?: string;
    banner?: string;
    createdAt: string;
    defaultChannelId?: string;
    id: string;
    isVerified?: boolean;
    name: string;
    ownerId: string;
    timezone?: string;
    type?: ServerType;
    url?: string;
}

export type ServerType = "clan" | "community" | "friends" | "guild" | "organization" | "other" | "streaming" | "team";
