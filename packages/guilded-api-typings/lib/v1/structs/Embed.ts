import type { EmbedPayload } from "./Message";

// embed struct for the client API, webhooks mainly
export interface APIEmbed extends EmbedPayload {
    author?: APIEmbedAuthor;
    image?: APIEmbedImage;
    thumbnail?: APIEmbedThumbnail;
    video?: APIEmbedVideo;
    provider?: APIEmbedProvider;
    footer?: APIEmbedFooter;
}

export interface APIEmbedFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
export interface APIEmbedImage {
    url: string;
    proxy_url?: string;
    height?: string;
    width?: string;
}
export type APIEmbedThumbnail = APIEmbedImage;

export type APIEmbedVideo = APIEmbedImage;

export interface APIEmbedProvider {
    name?: string;
    url?: string;
}

export interface APIEmbedAuthor {
    name: string;
    icon_url?: string;
    url?: string;
    proxy_icon_url?: string;
}
