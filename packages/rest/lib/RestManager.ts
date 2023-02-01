/* eslint-disable @typescript-eslint/no-require-imports */
import EventEmitter from "node:events";
import FormData from "form-data";
import { stringify } from "qs";
import { GuildedAPIError } from "./errors/GuildedAPIError";
import { PermissionsError } from "./errors/PermissionsError";
import type { RestOptions } from "./typings";
// eslint-disable-next-line import/order
import { Router } from "./util/Router";

let HTTPFetch = globalThis.fetch;
if (!HTTPFetch) {
    HTTPFetch = require("node-fetch");
}

const packageDetails = require("../package.json");

const sleep = async (ms: number): Promise<unknown> => new Promise((resolve) => setTimeout(resolve, ms));

// FIXME properly type these
export type RequestOptions = {
    body?: BodyInit;
    headers: any;
    method: string;
    url: string;
};

// FIXME properly type these
export type ResponseDetails = {
    body: any;
    headers: any;
    status: number;
};

export class RestManager {
    /**
     * The bot token to be used for making requests.
     */
    token = this.options.token;

    /**
     * The version of the API to be used for making requests. By default, this will use the latest version that the library supports.
     */
    version = this.options.version ?? 1;

    /**
     * The proxy url if it was set.
     */
    proxyURL = this.options.proxyURL;

    /**
     * The router with all the helper methods.
     */
    readonly router = new Router(this);

    /**
     * Logging emitter
     */
    readonly emitter = new EventEmitter();

    constructor(public readonly options: RestOptions) {}

    /**
     * The base url to send the request to.
     */
    get baseURL(): string {
        return this.proxyURL ?? `https://www.guilded.gg/api/v${this.version}`;
    }

    public async make<T extends JSONB, B = RequestBodyObject, Q = never>(
        data: MakeOptions<B, Q>,
        authenticated = true,
        retryCount = 0,
        { returnAsText = false, bodyIsJSON = true }: { bodyIsJSON?: boolean; returnAsText?: boolean } = {},
    ): Promise<[Response, Promise<T | string>]> {
        const headers: HeadersInit = {};
        if (authenticated) headers.Authorization = `Bearer ${this.token}`;

        let body: BodyInit | undefined = data.body as BodyInit;
        if (data.body instanceof FormData) {
            body = data.body.getBuffer();
            Object.assign(headers, { ...data.body.getHeaders() });
        } else if (bodyIsJSON) {
            body = JSON.stringify(body);
        }

        const queryAppendedURL = data.query ? `${data.path}?${stringify(data.query)}` : data.path;
        const requestOptions: RequestOptions = {
            url: this.baseURL + queryAppendedURL,
            headers: {
                "content-type": "application/json",
                "User-Agent": `@guildedjs-rest/${packageDetails.version} Node.js v${process.version}`,
                ...headers,
                ...data.headers,
            },
            method: data.method,
        };
        if (body) {
            requestOptions.body = body;
        }

        let response;
        try {
            response = await HTTPFetch(requestOptions.url, requestOptions);
        } catch (error: any) {
            throw new Error(`Error while making API call, ${error.message.toString()}`);
        }

        if (!response.ok) {
            if (response.status === 429) {
                const retryAfterTime = Number(response.headers.get("Retry-After") ?? 35);

                if (retryCount >= (this.options?.maxRatelimitRetryLimit ?? 3)) {
                    throw new Error("MAX REQUEST RATELIMIT RETRY LIMIT REACHED.");
                }

                await sleep(retryAfterTime * 1_000);
                return this.make<T, B, Q>(data, authenticated, retryCount++);
            }

            const rawResponse: string = await response.text().catch(() => "Could not read underlying response body buffer"); // this shouldn't happen
            let parsedResponse: any | string = rawResponse;

            if (requestOptions.method !== "HEAD" && response.status !== 204) {
                // json body won't be returned in these cases, so don't attempt to parse as json
                try {
                    parsedResponse = JSON.parse(rawResponse);
                } catch {
                    // response was still malformed somehow; just allow it to be reported as text
                }
            }

            // FIXME BEFORE LOGGING THE ERROR, YOU MUST OBFUSCATE THE `authorization` HEADER BEFORE MERGING THIS PR!
            // FIXME BEFORE LOGGING THE ERROR, YOU MUST OBFUSCATE THE `authorization` HEADER BEFORE MERGING THIS PR!
            // FIXME BEFORE LOGGING THE ERROR, YOU MUST OBFUSCATE THE `authorization` HEADER BEFORE MERGING THIS PR!
            // ideally, request headers should be using https://developer.mozilla.org/en-US/docs/Web/API/Headers (it exists on node-fetch).
            // so that this can be done in a case insensitive way

            const responseDetails: ResponseDetails = {
                status: response.status,
                headers: response.headers,
                body: parsedResponse,
            };

            let errorMessage: string;
            if (typeof parsedResponse === "string") {
                errorMessage = parsedResponse;
            } else {
                errorMessage = parsedResponse.message;
            }

            if (responseDetails.status === 403) {
                throw new PermissionsError(errorMessage, requestOptions, responseDetails);
            }

            throw new GuildedAPIError(errorMessage, requestOptions, responseDetails);
        }

        return [response, returnAsText ? response.text() : (response.json().catch(() => ({})) as Promise<T>)];
    }

    public async get<T extends JSONB, Q = RequestBodyObject>(path: string, query?: Q, authenticated = true): Promise<T> {
        return this.make<T, never, Q>(
            {
                method: "GET",
                path,
                query,
            },
            authenticated,
        ).then(async (x) => x[1] as Promise<T>);
    }

    public async post<T extends JSONB, B = RequestBodyObject>(path: string, body?: B, authenticated = true): Promise<T> {
        return this.make<T, B>(
            {
                body,
                method: "POST",
                path,
            },
            authenticated,
        ).then(async (x) => x[1] as Promise<T>);
    }

    public async delete<T extends JSONB, B = RequestBodyObject>(path: string, body?: B, authenticated = true): Promise<T> {
        return this.make<T, B>(
            {
                body,
                method: "DELETE",
                path,
            },
            authenticated,
        ).then(async (x) => x[1] as Promise<T>);
    }

    public async patch<T extends JSONB, B = RequestBodyObject>(path: string, body: B, authenticated = true): Promise<T> {
        return this.make<T, B>(
            {
                body,
                method: "PATCH",
                path,
            },
            authenticated,
        ).then(async (x) => x[1] as Promise<T>);
    }

    public async put<T extends JSONB, B = RequestBodyObject>(path: string, body?: B, authenticated = true): Promise<T> {
        return this.make<T, B>(
            {
                body,
                method: "PUT",
                path,
            },
            authenticated,
        ).then(async (x) => x[1] as Promise<T>);
    }
}

export type MakeOptions<B = Record<string, any>, Q = RequestBodyObject> = {
    body?: B | FormData;
    headers?: Record<string, string>;
    isFormData?: boolean;
    method: string;
    path: string;
    query?: Q;
};
export type JSONB = Record<string, any>;
export type RequestBodyObject = JSONB | undefined;
