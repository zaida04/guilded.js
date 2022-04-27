import type { WSListItemUncompleted, WSListItemCompleted } from "@guildedjs/guilded-api-typings";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class ListEventHandler extends GatewayEventHandler {
    ListItemCompleted(data: WSListItemCompleted) {
        return false;
    }
    ListItemUncompleted(data: WSListItemUncompleted) {
        return false;
    }
}
