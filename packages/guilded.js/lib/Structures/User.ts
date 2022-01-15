import { SocialLinkType } from "@guildedjs/rest";
import Client from "../Client";
import { Base } from "./Base";

export interface UserPayload {
    id: string;
}

export class User extends Base {
    /** The id of the user */
    id: string;

    constructor(client: Client, payload: UserPayload) {
        super(client);

        this.id = payload.id;
    }

    /** Retrieves the user's public social links */
    getSocialLinks(type: SocialLinkType) {
        return this.client.getMemberSocialLinks(this.id, type);
    }
}
