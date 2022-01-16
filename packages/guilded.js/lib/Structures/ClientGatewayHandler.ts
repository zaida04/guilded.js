import { MessagePayload } from "@guildedjs/rest";
import Base from "./Base";
import Message from "./Message";

export interface GatewayMessagePayload {
    message: MessagePayload;
}

export interface ChatMessageDeletedPayload {
    message: {
        /** The ID of the message */
        id: string;
        /** The ID of the channel */
        channelId: string;
        /** The ISO 8601 timestamp that the message was deleted at */
        deletedAt: string;
    };
}

export interface TeamMemberUpdatedPayload {
    userInfo: TeamMemberUpdatedUserInfo;
}

export interface TeamMemberUpdatedUserInfo {
    /** The ID of the user */
    id: string;
    /** The nickname that was just updated for the user */
    nickname: string;
}

export interface TeamRolesUpdatedPayload {
    memberRoleIds: Record<string, unknown>[];
}

export class ClientGatewayHandler extends Base {
    ChatMessageCreated(payload: GatewayMessagePayload) {
        const message = new Message(this.client, payload);
        // TODO: caching?
        this.client.emit("messageCreated", message);
    }

    ChatMessageUpdated(payload: GatewayMessagePayload) {
        const message = new Message(this.client, payload);
        // TODO: caching?
        this.client.emit("messageUpdated", message);
    }

    ChatMessageDeleted(payload: ChatMessageDeletedPayload) {
        // TODO: caching?
        this.client.emit(
            "messageDeleted",
            {
                id: payload.message.id,
                channelId: payload.message.channelId,
                deletedAt: Date.parse(payload.message.deletedAt),
            },
            // TODO: CACHED MESSAGE here
        );
    }

    TeamMemberUpdated(payload: TeamMemberUpdatedPayload) {
        // TODO: updated cached member
        this.client.emit("memberUpdated", payload.userInfo);
    }

    teamRolesUpdated(payload: TeamRolesUpdatedPayload) {
        this.client.emit("teamRolesUpdated", payload);
    }
}
