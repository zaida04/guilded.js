import { CategoryPayload } from "@guildedjs/api";
import { Base } from "./Base";
import { Client } from "./Client";
import { parseToStamp } from "../util";

export class Category extends Base<CategoryPayload, number> {
    serverId: string;
    name!: string;
    _createdAt: number;
    groupId: string;
    _updatedAt!: number | null;

    constructor(client: Client, data: CategoryPayload) {
        super(client, data);
        this.serverId = data.serverId;
        this._createdAt = parseToStamp(data.createdAt)!;
        this.groupId = data.groupId;

        this._update(data);
    }

    _update(data: CategoryPayload): this {
        if (typeof data.name !== "undefined") this.name = data.name;
        if (typeof data.updatedAt !== "undefined") this._updatedAt = parseToStamp(data.updatedAt);

        return this;
    }
}
