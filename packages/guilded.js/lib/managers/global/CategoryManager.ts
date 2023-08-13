import type { CategoriesService } from "@guildedjs/api";
import { Category } from "../../structures/Category";
import type { OptionBody } from "../../typings";
import { CacheableStructManager } from "./CacheableStructManager";

/**
 * Manager for interacting with Catregories on Guilded.
 */
export class GlobalCategoryManager extends CacheableStructManager<number, Category> {
    /**
     * Create a new category
     *
     * @param serverId The ID of the server to create the category in.
     * @param options Category creation options
     * @returns Promise that resolves with the newly created category
     */
    async create(serverId: string, options: OptionBody<CategoriesService["categoryCreate"]>): Promise<Category> {
        const data = await this.client.rest.router.categories.categoryCreate({
            serverId,
            requestBody: options,
        });
        const createdCategory = new Category(this.client, data.category);
        this.cache.set(createdCategory.id, createdCategory);
        return createdCategory;
    }

    async fetch(serverId: string, categoryId: number): Promise<Category> {
        const data = await this.client.rest.router.categories.categoryRead({
            serverId,
            categoryId,
        });
        const fetchedCategory = new Category(this.client, data.category);
        this.cache.set(fetchedCategory.id, fetchedCategory);
        return fetchedCategory;
    }

    /**
     * Update a category
     *
     * @param serverId The ID of the server to update the category in.
     * @param categoryId The ID of the category to update.
     * @param options The options to update the category with.
     * @returns A Promise that resolves with the updated category.
     */
    async update(serverId: string, categoryId: number, options: OptionBody<CategoriesService["categoryUpdate"]>): Promise<Category> {
        const data = await this.client.rest.router.categories.categoryUpdate({
            serverId,
            categoryId,
            requestBody: options,
        });

        let category = this.cache.get(data.category.id)?._update(data.category);
        category ??= new Category(this.client, data.category);
        return category;
    }

    /**
     * Delete a category
     *
     * @param serverId The ID of the server to delete the category from.
     * @param categoryId The ID of the category to delete.
     * @returns A Promise that resolves when the operation is complete.
     */
    async delete(serverId: string, categoryId: number): Promise<void> {
        await this.client.rest.router.categories.categoryDelete({ serverId, categoryId });
        if (this.cache.has(categoryId)) this.cache.delete(categoryId);
    }
}
