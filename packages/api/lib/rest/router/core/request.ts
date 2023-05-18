/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { RestManager } from '../../RestManager';
import type { ApiRequestOptions } from './ApiRequestOptions';

export const request = async <T>(client: RestManager, options: ApiRequestOptions) => {
	const formattedPath = options.url;
	if (options.path) {
		for (const key in options.path) {
			formattedPath.replace(`{${key}}`, options.path[key]);
		}
	}

	return client.make({
		method: options.method,
		headers: options.headers,
		"isFormData": false,
		"path": formattedPath,
		"query": options.query,
		"body": options.body,
	});
};
