let HTTPFetch = globalThis.fetch;
if (!HTTPFetch) {
    HTTPFetch = require("node-fetch");
}

import EventEmitter from "events";
import { stringify } from "qs";

const packageDetails = require("../package.json");
import FormData from "form-data";

import { GuildedAPIError } from "./errors/GuildedAPIError";
import { PermissionsError } from "./errors/PermissionsError";
import type { RestOptions } from "./typings";
import { Router } from "./util/Router";

export class RestManager {
    /** The bot token to be used for making requests. */
    token = this.options.token;

    /** The version of the API to be used for making requests. By default, this will use the latest version that the library supports. */
    version = this.options.version ?? 1;

    /** The proxy url if it was set. */
    proxyURL = this.options.proxyURL;

    /** The router with all the helper methods. */
    readonly router = new Router(this);

    /** Logging emitter */
    readonly emitter = new EventEmitter();

    constructor(public readonly options: RestOptions) {}

    /** The base url to send the request to. */
    get baseURL(): string {
        return this.proxyURL ?? `https://www.guilded.gg/api/v${this.version}`;
    }

    public async make<T extends JSONB, B = RequestBodyObject, Q = never>(
        data: MakeOptions<B, Q>,
        authenticated = true,
        retryCount = 0,
    ): Promise<[Response, Promise<T>]> {
        const headers: HeadersInit = {};
        if (authenticated) headers.Authorization = `Bearer ${this.token}`;

        let body: Buffer | string | undefined = undefined;
        if (data.body instanceof FormData) {
            body ??= data.body.getBuffer();
            Object.assign(headers, { ...data.body.getHeaders() });
        } else {
            body ??= JSON.stringify(body);
        }

        const requestOptions = {
            body,
            headers: {
                "content-type": "application/json",
                "User-Agent": `@guildedjs-rest/${packageDetails.version} Node.js v${process.version}`,
                ...headers,
                ...data.headers,
            },
            method: data.method,
        };

        const queryAppendedURL = data.query ? `${data.path}?${stringify(data.query)}` : data.path;
        let response;
        try {
            response = await HTTPFetch(this.baseURL + queryAppendedURL, requestOptions);
        } catch (e: any) {
            throw new Error(`Error while making API call, ${e.message.toString()}`);
        }

        if (!response.ok) {
            if (response.status === 429) {
                const retryAfterTime = Number(response.headers.get("Retry-After") ?? 35);

                if (retryCount >= (this.options?.maxRatelimitRetryLimit ?? 3)) {
                    throw new Error("MAX REQUEST RATELIMIT RETRY LIMIT REACHED.");
                }
                await sleep(retryAfterTime * 1000);
                return this.make<T, B, Q>(data, authenticated, retryCount++);
            }

            const parsedResponse = await response.json().catch(() => ({ message: "Cannot parse JSON Error Response." }));
            if (response.status === 403 && parsedResponse.code === "ForbiddenError") {
                throw new PermissionsError(parsedResponse.message, data.method, data.path, parsedResponse.meta?.missingPermissions);
            }
            throw new GuildedAPIError(parsedResponse.message, data.method, data.path, response.status);
        }

        return [response, response.json().catch(() => ({})) as Promise<T>];
    }

    public get<T extends JSONB, Q = RequestBodyObject>(path: string, query?: Q, authenticated = true): Promise<T> {
        return this.make<T, never, Q>(
            {
                method: "GET",
                path,
                query,
            },
            authenticated,
        ).then((x) => x[1]);
    }

    public post<T extends JSONB, B = RequestBodyObject>(path: string, body?: B, authenticated = true): Promise<T> {
        return this.make<T, B>(
            {
                body,
                method: "POST",
                path,
            },
            authenticated,
        ).then((x) => x[1]);
    }

    public delete<T extends JSONB, B = RequestBodyObject>(path: string, body?: B, authenticated = true): Promise<T> {
        return this.make<T, B>(
            {
                body,
                method: "DELETE",
                path,
            },
            authenticated,
        ).then((x) => x[1]);
    }

    public patch<T extends JSONB, B = RequestBodyObject>(path: string, body: B, authenticated = true): Promise<T> {
        return this.make<T, B>(
            {
                body,
                method: "PATCH",
                path,
            },
            authenticated,
        ).then((x) => x[1]);
    }

    public put<T extends JSONB, B = RequestBodyObject>(path: string, body?: B, authenticated = true): Promise<T> {
        return this.make<T, B>(
            {
                body,
                method: "PUT",
                path,
            },
            authenticated,
        ).then((x) => x[1]);
    }
}

export interface MakeOptions<B = Record<string, any>, Q = RequestBodyObject> {
    method: string;
    query?: Q;
    path: string;
    body?: B | FormData;
    isFormData?: boolean;
    headers?: Record<string, string>;
}
export type JSONB = Record<string, any>;
export type RequestBodyObject = JSONB | undefined;

const sleep = (ms: number): Promise<unknown> => new Promise((r) => setTimeout(r, ms));
