import { Collection } from "@discordjs/collection";
import type { GroupsService } from "@guildedjs/api";
import { Group } from "../../structures";
import type { OptionBody } from "../../typings";
import { CacheableStructManager } from "./CacheableStructManager";
import { GlobalManager } from "./GlobalManager";

/**
 * Manager for interacting with Groups on Guilded.
 */
export class GlobalGroupManager extends CacheableStructManager<string, Group> {
    /**
     * Creates a group.
     *
     * @param serverId The ID of the server to create the group in.
     * @param options The options for the group to create.
     * @returns A Promise that resolves with the created group.
     */
    create(serverId: string, options: OptionBody<GroupsService["groupCreate"]>): Promise<Group> {
        return this.client.rest.router.groups.groupCreate({ serverId, requestBody: options }).then((data) => {
            const createdGroup = new Group(this.client, data.group);
            this.cache.set(createdGroup.id, createdGroup);
            return createdGroup;
        });
    }

    /**
     * Fetch a group
     *
     * @param serverId The ID of the server to fetch the group from.
     * @param groupId The ID of the group to fetch.
     * @returns A Promise that resolves with the fetched group.
     */
    fetch(serverId: string, groupId: string): Promise<Group> {
        return this.client.rest.router.groups.groupRead({ serverId, groupId }).then((data) => {
            const fetchedGroup = new Group(this.client, data.group);
            this.cache.set(fetchedGroup.id, fetchedGroup);
            return fetchedGroup;
        });
    }

    /**
     * Fetch all the groups in a server
     *
     * @param serverId The ID of the server to fetch the groups from.
     * @returns A Promise that resolves a Collection containing the fetched groups.
     */
    fetchMany(serverId: string): Promise<Collection<string, Group>> {
        return this.client.rest.router.groups.groupReadMany({ serverId }).then((data) => {
            const groups = new Collection<string, Group>();

            for (const group of data.groups) {
                const fetchedGroup = new Group(this.client, group);
                this.cache.set(fetchedGroup.id, fetchedGroup);
                groups.set(fetchedGroup.id, fetchedGroup);
            }

            return groups;
        });
    }

    /**
     * Update a group
     *
     * @param serverId The ID of the server to update the group in.
     * @param groupId The ID of the group to update.
     * @param options The options to update the group with.
     * @returns A Promise that resolves with the updated group.
     */
    update(serverId: string, groupId: string, options: OptionBody<GroupsService["groupUpdate"]>): Promise<Group> {
        return this.client.rest.router.groups.groupUpdate({ serverId, groupId, requestBody: options }).then((data) => {
            let group = this.cache.get(data.group.id)?._update(data.group);
            group ??= new Group(this.client, data.group);

            return group;
        });
    }

    /**
     * Delete a group
     *
     * @param serverId The ID of the server to delete the group from.
     * @param groupId The ID of the group to delete.
     * @returns A Promise that resolves when the operation is complete.
     */
    delete(serverId: string, groupId: string): Promise<void> {
        return this.client.rest.router.groups.groupDelete({ serverId, groupId }).then(() => {
            if (this.cache.has(groupId)) this.cache.delete(groupId);
        });
    }

    /**
     * Adds a member to a group.
     *
     * @param groupId The ID of the group.
     * @param userId The ID of the user to add.
     * @returns A Promise that resolves when the operation is complete.
     */
    addMember(groupId: string, userId: string): Promise<void> {
        return this.client.rest.router.groupMembership.groupMembershipCreate({ groupId, userId }).then(() => void 0);
    }

    /**
     * Removes a member from a group.
     *
     * @param groupId The ID of the group.
     * @param userId The ID of the user to remove.
     * @returns A Promise that resolves when the operation is complete.
     */
    removeMember(groupId: string, userId: string): Promise<void> {
        return this.client.rest.router.groupMembership.groupMembershipDelete({ groupId, userId }).then(() => void 0);
    }
}
