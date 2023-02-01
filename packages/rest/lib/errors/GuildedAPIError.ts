/* istanbul ignore file */

import type { RequestOptions, ResponseDetails } from "../RestManager";

export class GuildedAPIError extends Error {
    method: string;
    path: string;
    request: RequestOptions | undefined;
    response: ResponseDetails | undefined;

    public constructor(
        msg: string,
        methodOrRequest: RequestOptions | string, // backwards compatibility
        pathOrResponse: ResponseDetails | string, // backwards compatibility
        public readonly code?: number | string, // this can be removed eventually, as it should be returned on the response
    ) {
        // a lot of wonkiness here in the interest of backwards compatibility
        let method: string;
        let path: string;
        let request: RequestOptions | undefined;
        let response: ResponseDetails | undefined;
        if (typeof methodOrRequest === "string") {
            method = methodOrRequest;
        } else {
            method = methodOrRequest.method;
            request = methodOrRequest;
            path = methodOrRequest.url;
        }

        if (typeof pathOrResponse === "string") {
            path = pathOrResponse;
        } else {
            path = "/UNDEFINED-PATH"; // this shouldn't happen
            response = pathOrResponse;
        }

        super(`[GuildedAPIError:${code}:${method.toUpperCase()}] ${path} - ${msg}`);

        this.method = method;
        this.path = path;
        if (request) {
            this.request = request;
        }

        if (response) {
            this.response = response;
        }
    }
}
