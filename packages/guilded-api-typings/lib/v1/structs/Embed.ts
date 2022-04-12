export interface APIEmbed {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: APIEmbedFooter;
    image?: APIEmbedImage;
    thumbnail?: APIEmbedThumbnail;
    video?: APIEmbedVideo;
    provider?: APIEmbedProvider;
    author?: APIEmbedAuthor;
    fields?: APIEmbedField[];
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
export interface APIEmbedField {
    inline?: boolean;
    name: string;
    value: string;
}
