import { rest, ws } from "./v1";

export * from "./v1";

export type JSONContent = { "application/json": Record<string, any> }
export type JSON<T extends JSONContent> = T["application/json"];

export type RestContent = { "content": JSONContent }
export type RestPath<T extends keyof rest.paths> = rest.paths[T]
export type RestBody<K extends { requestBody: RestContent }> = K["requestBody"]["content"]["application/json"];
export type RestQuery<K extends { parameters: { query: Record<string, any> } }> = K["parameters"]["query"];
export type RestPayload<K extends { responses: Record<number, RestContent> }, S extends 200 | 201 | 204> = K["responses"][S]["content"]["application/json"]

export type WSContent = RestContent;
export type WSPayload<T extends keyof ws.components["responses"]> = ws.components["responses"][T]["content"]["application/json"]