import type { SkeletonWSPayload, components } from "./v1";

export * from "./v1";

export type JSONContent = { "application/json": Record<string, any> };
export type JSON<T extends JSONContent> = T["application/json"];

export type WSSchema<T extends keyof components["schemas"]> = components["schemas"][T];
export type WSContent = { content: JSONContent };
export type WSPayload<T extends keyof components["responses"]> =
	components["responses"][T]["content"]["application/json"];
export type WSPacket<T extends keyof components["responses"]> = SkeletonWSPayload & { d: WSPayload<T> };
