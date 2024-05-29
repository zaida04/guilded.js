/* istanbul ignore file */
/* eslint-disable */
import { RestManager } from "../../../rest/RestManager";
import type { ApiRequestOptions } from "./ApiRequestOptions";
import type { CancelablePromise } from "./CancelablePromise";

export abstract class BaseHttpRequest {
	constructor(public readonly rest: RestManager) {}

	public abstract request<T>(options: ApiRequestOptions): CancelablePromise<T>;
}
