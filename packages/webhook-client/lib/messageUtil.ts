import type { APIContent, APIEmbed } from "@guildedjs/guilded-api-typings";

import { Embed } from "./Embed";

export function parseToMessage(input: string | EmbedStructure = "", embed?: EmbedStructure): APIContent {
    return {
        document: {
            data: {},
            nodes: [
                {
                    data: {},
                    nodes: [
                        {
                            leaves: [
                                {
                                    marks: [],
                                    object: "leaf",
                                    text: typeof input === "string" ? input : "",
                                },
                            ],
                            object: "text",
                        },
                    ],
                    object: "block",
                    type: "markdown-plain-text",
                },
                {
                    data: {
                        embeds: embed
                            ? embed instanceof Embed
                                ? [embed?.toJSON()]
                                : [embed]
                            : typeof input === "string"
                            ? []
                            : input instanceof Embed
                            ? [input?.toJSON()]
                            : [input],
                    },
                    nodes: [],
                    object: "block",
                    type: "webhookMessage",
                },
            ],
            object: "document",
        },
        object: "value",
    };
}

/**
 * Parse a message recieved from Guilded into a more digestable structure
 * @internal
 */
export function parseMessage(data: APIContent): parsedMessage {
    const parsedMessageArray: parsedTextResponse[] = [];
    let parsedMessageTextContent = "";
    const mentions: {
        users: string[];
        channels: string[];
        reactions: string[];
        roles: string[];
    } = {
        channels: [],
        reactions: [],
        roles: [],
        users: [],
    };
    const embeds: APIEmbed[] = [];
    const messageLinesWithoutEmpty = data.document.nodes.filter((x) =>
        x.type === "webhookMessage" ? (x.data as { embeds: APIEmbed[] }).embeds.length > 0 : true,
    );

    for (let i = 0; i < messageLinesWithoutEmpty.length; i++) {
        const messageLine = data.document.nodes[i];
        if (i) parsedMessageTextContent += "\n";
        switch (messageLine.type) {
            case "paragraph": {
                for (const node of messageLine.nodes) {
                    switch (node.object) {
                        case "text": {
                            for (const leaf of node.leaves!) {
                                if (leaf.text) {
                                    parsedMessageArray.push({
                                        content: leaf.text,
                                        type: "text",
                                    });
                                }
                                parsedMessageTextContent += leaf.text;
                            }
                            break;
                        }
                        case "inline": {
                            const castedDataNode = node.data as MessageDataNode;
                            for (const leaf of node.nodes![0].leaves!) {
                                switch (node.type) {
                                    case "mention": {
                                        switch (castedDataNode.mention!.type) {
                                            case "person": {
                                                mentions.users.push(castedDataNode.mention!.id as string);
                                                parsedMessageArray.push({
                                                    content: leaf.text,
                                                    mention: castedDataNode.mention,
                                                    type: "user",
                                                });
                                                break;
                                            }
                                            case "role": {
                                                parsedMessageArray.push({
                                                    content: leaf.text,
                                                    mention: castedDataNode.mention,
                                                    type: "role",
                                                });
                                                mentions.roles.push(castedDataNode.mention!.id.toString());
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    /* istanbul ignore next */
                                    case "reaction": {
                                        mentions.reactions.push(castedDataNode.reaction!.id);
                                        parsedMessageArray.push({
                                            content: leaf.text,
                                            reaction: castedDataNode.reaction,
                                            type: "reaction",
                                        });
                                        break;
                                    }
                                    case "channel": {
                                        mentions.channels.push(castedDataNode.channel!.id);
                                        parsedMessageArray.push({
                                            channel: castedDataNode.channel,
                                            content: leaf.text,
                                            type: "channel",
                                        });
                                        break;
                                    }
                                }
                                parsedMessageTextContent += leaf.text;
                                break;
                            }
                        }
                    }
                }
                break;
            }
            /* istanbul ignore next */
            case "block-quote-container": {
                for (const messageNodes of messageLine.nodes) {
                    for (const node of messageNodes.nodes!) {
                        switch (node.object) {
                            case "text": {
                                if (node.leaves![0].text) {
                                    parsedMessageArray.push({
                                        content: node.leaves![0].text,
                                        type: "text",
                                    });
                                }
                                parsedMessageTextContent += node.leaves![0].text;
                                break;
                            }
                            case "inline": {
                                const castedDataNode = node.data as MessageDataNode;
                                switch (node.type) {
                                    case "mention": {
                                        switch (castedDataNode.mention!.type) {
                                            case "person": {
                                                mentions.users.push(castedDataNode.mention!.id as string);
                                                parsedMessageArray.push({
                                                    content: node.nodes![0].leaves![0].text,
                                                    mention: castedDataNode.mention,
                                                    type: "user",
                                                });
                                                break;
                                            }
                                            case "role": {
                                                parsedMessageArray.push({
                                                    content: node.nodes![0].leaves![0].text,
                                                    mention: castedDataNode.mention,
                                                    type: "role",
                                                });
                                                mentions.roles.push(castedDataNode.mention!.id.toString());
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                    case "reaction": {
                                        mentions.reactions.push(castedDataNode.reaction!.id);
                                        parsedMessageArray.push({
                                            content: node.nodes![0].leaves![0].text,
                                            reaction: castedDataNode.reaction,
                                            type: "reaction",
                                        });
                                        break;
                                    }
                                    case "channel": {
                                        mentions.channels.push(castedDataNode.channel!.id);
                                        parsedMessageArray.push({
                                            channel: castedDataNode.channel,
                                            content: node.nodes![0].leaves![0].text,
                                            type: "channel",
                                        });
                                        break;
                                    }
                                }
                                parsedMessageTextContent += node.nodes![0].leaves![0].text;
                                break;
                            }
                        }
                    }
                }
                break;
            }
            case "markdown-plain-text": {
                if (messageLine.nodes![0].leaves![0].text) {
                    parsedMessageArray.push({
                        content: messageLine.nodes![0].leaves![0].text,
                        type: "text",
                    });
                }
                parsedMessageTextContent += messageLine.nodes![0].leaves![0].text;
                break;
            }
            case "webhookMessage": {
                embeds.push(...(messageLine.data as { embeds: APIEmbed[] }).embeds);
                break;
            }
        }
    }

    return {
        embeds,
        mentions,
        parsedArr: parsedMessageArray,
        parsedText: parsedMessageTextContent.trim(),
    };
}

/**
 * A parsed message
 * @internal
 */
export interface parsedMessage {
    parsedText: string;
    parsedArr: parsedTextResponse[];
    mentions: {
        users: string[];
        channels: string[];
        reactions: string[];
        roles: string[];
    };
    embeds: APIEmbed[];
}

/**
 * The mentions this message might contain
 * @internal
 */
export interface MessageDataNode {
    reaction?: {
        id: string;
    };
    mention?: {
        id: string | number;
        type: string;
        matcher: string;
        name: string;
        color: string;
        nickname?: boolean;
        avatar?: string;
    };
    channel?: {
        id: string;
        matcher: string;
        name: string;
    };
}

export type EmbedStructure = Embed | APIEmbed;

/**
 * The parsed text of each leaf in the message
 * @internal
 */
export interface parsedTextResponse {
    type: string;
    content: string;
    mention?: unknown;
    reaction?: unknown;
    channel?: unknown;
}

/**
 * The message structure of a string -> message object suitable to send to guilded
 */
export interface enforcedMessageStructure {
    messageId: string;
    content: APIContent;
}
