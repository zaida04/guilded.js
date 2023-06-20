/* istanbul ignore file */
/* eslint-disable */
import { RestManager } from "../../../rest/RestManager";
import type { ApiRequestOptions } from "./ApiRequestOptions";
import { BaseHttpRequest } from "./BaseHttpRequest";
import type { CancelablePromise } from "./CancelablePromise";
import { request as __request } from "./request";

export class FetchHttpRequest extends BaseHttpRequest {
    constructor(rest: RestManager) {
        super(rest);
    }

    /**
     * Request method
     * @param options The request options from the service
     * @returns CancelablePromise<T>
     * @throws ApiError
     */
    public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
        return __request(this.rest, options);
    }
}
