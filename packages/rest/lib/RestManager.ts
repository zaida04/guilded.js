import fetch, { Request, Response } from "node-fetch";
import { RestOptions, RequestMethods } from "./typings";
import { ROUTES } from "@guildedjs/common";
import { GuildedAPIError } from "./GuildedAPIError";
import { Router } from "./Router";

export class RestManager {
    /** The bot token to be used for making requests. */
    token: string;
    /** The version of the API to be used for making requests. By default, this will use the latest version that the library supports. */
    version: number;
    /** The proxy url if it was set. */
    proxyURL?: string;
    /** The router with all the helper methods. */
    router: Router;

    constructor(public readonly options: RestOptions) {
        this.token = options.token;
        this.version = options.version ?? 1;
        this.proxyURL = options.proxyURL;
        this.router = new Router(this);
    }

    /** The base url to send the request to. */
    get baseURL() {
        return this.proxyURL ?? `https://${ROUTES.BASE_DOMAIN}/api/v${this.version}`;
    }

    public async make<T extends JSONB, B = RequestBodyObject, Q = never>(
        data: MakeOptions<B>,
        authenticated = true,
        retryCount = 0,
    ): Promise<[Response, Promise<T>]> {
        const headers: HeadersInit = {};
        if (authenticated) headers.Authorization = `Bearer ${this.token}`;
        const requestOptions = {
            body: data.body ? JSON.stringify(data.body) : undefined,
            headers: {
                "content-type": "application/json",
                ...headers,
            },
            method: data.method,
        };

        let request;
        try {
            request = await fetch(this.baseURL + data.path, requestOptions);
        } catch (e: any) {
            throw new Error(`Error while making API call, ${e.message.toString()}`);
        }

        if (!request.ok) {
            if (request.status === 429) {
                if (retryCount >= (this.options?.maxRatelimitRetryLimit ?? 3)) {
                    throw new Error("MAX REQUEST RATELIMIT RETRY LIMIT REACHED.");
                }
                await sleep(this.options?.restOffset ?? 3500);
                return this.make<T>(data, authenticated, retryCount++);
            }

            const parsedRequest = await request.json().catch(() => ({ message: "Cannot parse JSON Error Response." }));
            throw new GuildedAPIError(parsedRequest.message, data.method, data.path, request.status);
        }

        return [request, request.json().catch(() => ({})) as Promise<T>];
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

    /** Handle the error when a request is made. By default this simply logs it to the console. Useful if you want to implement Sentry or some custom handling of Rest errors. */
    handleError(error: Error) {
        console.error(error);
    }
}

export interface MakeOptions<B = Record<string, any>> {
    method: string;
    query?: RequestBodyObject;
    path: string;
    body?: B;
}
export type JSONB = Record<string, any>;
export type RequestBodyObject = JSONB | undefined;

const sleep = (ms: number): Promise<unknown> => new Promise((r) => setTimeout(r, ms));
