/* istanbul ignore file */
/* eslint-disable */
import { RestManager } from "../../../rest/RestManager";
import type { ApiRequestOptions } from "./ApiRequestOptions";

export function request<T>(rest: RestManager, options: ApiRequestOptions) {
	let formattedPath =
		options.url;
	if (
		options.path
	) {
		for (const key in options.path) {
			formattedPath =
				formattedPath.replace(
					`{${key}}`,
					options
						.path[
						key
					],
				);
		}
	}

	return rest
		.make(
			{
				method: options.method,
				headers: options.headers,
				isFormData: false,
				path: formattedPath,
				query: options.query,
				body: options.body,
			},
		)
		.then(
			(
				x,
			) =>
				x[1] as T,
		);
}
