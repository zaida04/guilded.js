/* istanbul ignore file */

/* eslint-disable */
import { RestManager } from "../../../rest/RestManager";
import type { ApiRequestOptions } from "./ApiRequestOptions";

export class HttpRequest {
  constructor(public readonly rest: RestManager) {}

  public request<T>(options: ApiRequestOptions) {
    const formattedPath = options.url;
    if (options.path) {
      for (const key in options.path) {
        formattedPath.replace(`{${key}}`, options.path[key]);
      }
    }

    return this.rest
      .make({
        method: options.method,
        headers: options.headers,
        isFormData: false,
        path: formattedPath,
        query: options.query,
        body: options.body,
      })
      .then((x) => x[1] as T);
  }
}
