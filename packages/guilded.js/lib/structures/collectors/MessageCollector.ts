import { constants } from "../../constants";
import type { Message } from "../Message";
import { Collector } from "./Collector";

export class MessageCollector extends Collector<Message> {
    hookEvents() {
        this.incrementMaxEventListeners();
        this.client.on(constants.clientEvents.MESSAGE_CREATED, this.boundItemReceiver);
    }

    _cleanup(): void {
        this.decrementMaxEventListeners();
        this.client.removeListener(constants.clientEvents.MESSAGE_CREATED, this.itemReceived);
    }
}
