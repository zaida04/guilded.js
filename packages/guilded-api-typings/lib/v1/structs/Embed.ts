import type { EmbedPayload } from "./Message";

// embed struct for the client API, webhooks mainly
export type APIEmbed = EmbedPayload & {
    author?: APIEmbedAuthor;
    footer?: APIEmbedFooter;
    image?: APIEmbedImage;
    provider?: APIEmbedProvider;
    thumbnail?: APIEmbedThumbnail;
    video?: APIEmbedVideo;
}

export type APIEmbedFooter = {
    icon_url?: string;
    proxy_icon_url?: string;
    text: string;
}
export type APIEmbedImage = {
    height?: string;
    proxy_url?: string;
    url: string;
    width?: string;
}
export type APIEmbedThumbnail = APIEmbedImage;

export type APIEmbedVideo = APIEmbedImage;

export type APIEmbedProvider = {
    name?: string;
    url?: string;
}

export type APIEmbedAuthor = {
    icon_url?: string;
    name: string;
    proxy_icon_url?: string;
    url?: string;
}
