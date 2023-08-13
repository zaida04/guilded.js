/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from "../models/Category";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class CategoriesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Create a category
     * @returns any Success
     * @throws ApiError
     */
    public categoryCreate({
        serverId,
        requestBody,
    }: {
        serverId: string;
        requestBody: {
            /**
             * Name of the category
             */
            name: string;
            /**
             * The ID of the group. If not provided, the category will be created in the "Server home" group from `serverId`.
             */
            groupId?: string;
        };
    }): CancelablePromise<{
        category: Category;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/servers/{serverId}/categories",
            path: {
                serverId: serverId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Read a category
     * @returns any Success
     * @throws ApiError
     */
    public categoryRead({ serverId, categoryId }: { serverId: string; categoryId: number }): CancelablePromise<{
        category: Category;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/servers/{serverId}/categories/{categoryId}",
            path: {
                serverId: serverId,
                categoryId: categoryId,
            },
        });
    }

    /**
     * Update a category
     * @returns any Success
     * @throws ApiError
     */
    public categoryUpdate({
        serverId,
        categoryId,
        requestBody,
    }: {
        serverId: string;
        categoryId: number;
        requestBody: {
            /**
             * Name of the category
             */
            name: string;
        };
    }): CancelablePromise<{
        category: Category;
    }> {
        return this.httpRequest.request({
            method: "PATCH",
            url: "/servers/{serverId}/categories/{categoryId}",
            path: {
                serverId: serverId,
                categoryId: categoryId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Delete a category
     * @returns any Success
     * @throws ApiError
     */
    public categoryDelete({ serverId, categoryId }: { serverId: string; categoryId: number }): CancelablePromise<{
        category: Category;
    }> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/servers/{serverId}/categories/{categoryId}",
            path: {
                serverId: serverId,
                categoryId: categoryId,
            },
        });
    }
}
