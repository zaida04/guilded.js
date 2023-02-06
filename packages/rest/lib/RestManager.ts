/* eslint-disable @typescript-eslint/no-require-imports */
import type { Buffer } from "node:buffer";
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

export type RequestOptions = {
    body?: BodyInit | Buffer;
    headers: Record<string, string>;
    method: HTTPMethods;
    url: string;
};

export type ResponseDetails = {
    body: JSONB | string;
    headers: Headers;
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

    /**
     * Generate obfuscated token. It replaces every char in a non-even index with X. I'm not very creative.
     */
    get obfuscatedToken(): string {
        return this.token.split("").reduce((prev, curr, index) => index % 2 ? prev + curr : prev + "X", "")
    }

    public async make<T extends JSONB, B = RequestBodyObject, Q = never>(
        data: MakeOptions<B, Q>,
        authenticated = true,
        retryCount = 0,
        { returnAsText = false, bodyIsJSON = true }: { bodyIsJSON?: boolean; returnAsText?: boolean } = {},
    ): Promise<[Response, Promise<T | string>]> {
        const headers: HeadersInit = {};
        // If this request requires authentication, add the Bearer token as a header.
        if (authenticated) headers.Authorization = `Bearer ${this.token}`;

        // Append stringified query params to the URL. This doesn't append the base URL yet.
        const queryAppendedURL = data.query ? `${data.path}?${stringify(data.query)}` : data.path;
        
        // All options to be sent with the request
        const requestOptions: RequestOptions = {
            url: this.baseURL + queryAppendedURL,
            headers: {
                // This gets changed later on if the request is formdata.
                "content-type": "application/json",
                // Used for logging on Guilded end.
                "User-Agent": `@guildedjs-rest/${packageDetails.version} Node.js v${process.version}`,
                // Spread the other headers like authentication.
                ...headers,
                // Spread any additional headers passed from the method.
                ...data.headers,
            },
            method: data.method,
        };

        // This mostly only applies to Webhook routes that allow you to attach files.
        if (data.body instanceof FormData) {
            // Turn the formdata into a buffer.
            requestOptions.body = data.body.getBuffer();
            // Merge the formdata generated boundary headers with the request headers. This will replace things like content-type and other conflicting headers.
            Object.assign(requestOptions.headers, { ...data.body.getHeaders() });
        } else if (bodyIsJSON) {
            // Turn JSON data into string.
            requestOptions.body = JSON.stringify(data.body);
        }

        // The reason we're hoisting the variable like this is so that we can have error handling for the underlying fetch request.
        let response;
        try {
            response = await HTTPFetch(requestOptions.url, requestOptions);
        } catch (error: any) {
            throw new Error(`Error while making API call, ${error.message.toString()}`);
        }

        if (!response.ok) {
            // Occurs when ratelimited.
            if (response.status === 429) {
                const retryAfterTime = Number(response.headers.get("Retry-After") ?? 35);

                // Check if request has failed 3+ times.
                if (retryCount >= (this.options?.maxRatelimitRetryLimit ?? 3)) {
                    throw new Error("MAX REQUEST RATELIMIT RETRY LIMIT REACHED.");
                }

                // Make the thread wait the amount of time specified in the Retry-After before retrying request.
                await sleep(retryAfterTime * 1_000);
                return this.make<T, B, Q>(data, authenticated, ++retryCount);
            }

            // Parse error response as text. The reason this isn't in the try/catch statement is because of the HEAD method not returning json.
            const rawResponse: string = await response.text().catch(() => "Could not read underlying response body buffer"); // this shouldn't happen
            let parsedResponse: any | string = rawResponse;
            let errorMessage: string = parsedResponse;

            if (requestOptions.method !== "HEAD" && response.status !== 204) {
                // json body won't be returned in these cases, so don't attempt to parse as json
                try {
                    parsedResponse = JSON.parse(rawResponse);
                    errorMessage = parsedResponse.message;
                } catch {
                    // response was still malformed somehow; just allow it to be reported as text
                }
            }

            // Details response object for error reporting.
            const responseDetails: ResponseDetails = {
                status: response.status,
                headers: response.headers,
                body: parsedResponse,
            };

            // obfuscate token in requestOptions for logging purposes.
            requestOptions.headers.Authorization = this.obfuscatedToken;

            // Occurs when bot has a permission missing
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

export type MakeOptions<B = RequestBodyObject, Q = RequestBodyObject> = {
    body?: B | FormData;
    headers?: Record<string, string>;
    isFormData?: boolean;
    method: HTTPMethods;
    path: string;
    query?: Q;
};
export type JSONB = Record<string, any>;
export type HTTPMethods = "DELETE" | "GET" | "HEAD" | "PATCH" | "POST" | "PUT";
export type RequestBodyObject = JSONB | undefined;
