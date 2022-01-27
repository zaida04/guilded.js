/* istanbul ignore file */

export enum IMG_EXTENSION {
    PNG = "png",
    GIF = "gif",
    WEBP = "webp",
}

export type IMG_SIZE = "Small" | "Medium" | "Large";

const formAssetURL = (route: string, hash: string, extension: string, width?: number, height?: number, size?: string) => {
    const url = new URL(`https://${ROUTES.IMAGE_CDN_DOMAIN}/${route}/${hash}-${size}.${extension.toLowerCase()}`);
    if (width) url.searchParams.append("w", width.toString());
    if (height) url.searchParams.append("h", height.toString());
    return url.toString();
};

export const ROUTES = {
    ASSETS: {
        AVATAR_URL: (hash: string, size: IMG_SIZE = "Medium"): string =>
            formAssetURL("UserAvatar", hash, IMG_EXTENSION.PNG, undefined, undefined, size),
        IMAGE_IN_CHAT: (hash: string, size = "Full", width?: number, height?: number): string =>
            formAssetURL("ContentMedia", hash, IMG_EXTENSION.WEBP, width, height, size),
        PROFILE_BANNER: (hash: string, size = "Hero", width?: number, height?: number): string =>
            formAssetURL("UserBanner", hash, IMG_EXTENSION.PNG, width, height, size),
        TEAM_BANNER: (hash: string, size = "Hero", width?: number, height?: number): string =>
            formAssetURL("TeamBanner", hash, IMG_EXTENSION.PNG, width, height, size),
        TEAM_EMOJI: (hash: string, size = "Full", extension: "WEBP" | "APNG" = "WEBP", width?: number, height?: number): string =>
            formAssetURL("CustomReaction", hash, extension.toLowerCase(), width, height, size),
        TEAM_ICON: (hash: string, size: "Small" | "Medium" | "Large" = "Medium"): string =>
            formAssetURL("TeamAvatar", hash, IMG_EXTENSION.PNG, undefined, undefined, size),
    },
    AWS_CDN: "https://s3-us-west-2.amazonaws.com/www.guilded.gg/" as const,
    BASE_DOMAIN: "www.guilded.gg" as const,
    WS_DOMAIN: "api.guilded.gg" as const,
    CDN: "img.guildedcdn.com" as const,
    IMAGE_CDN_DOMAIN: "img.guildedcdn.com" as const,
    MEDIA_DOMAIN: "media.guilded.gg" as const,
};
