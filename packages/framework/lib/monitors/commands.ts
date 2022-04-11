import Message from "guilded.js/types/structures/Message";
import { Monitor } from "../structures/Monitor";

export class CommandsMonitor extends Monitor {
    // Commands should not ignore dms.
    ignoreDM = false;

    /* eslint-disable @typescript-eslint/require-await */
    async execute(message: Message) {
        console.log("in command monitor", message);
    }
}
