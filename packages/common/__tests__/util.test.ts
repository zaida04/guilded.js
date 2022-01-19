import { ROUTES } from "..";

const TEST_DATA = {
    "chat-image": {
        hash: "d188d2a966eb85ce754aee5d2b51254c",
        testURLs: {
            Full: "https://img.guildedcdn.com/ContentMedia/d188d2a966eb85ce754aee5d2b51254c-Full.webp",
            "Full-size": "https://img.guildedcdn.com/ContentMedia/d188d2a966eb85ce754aee5d2b51254c-Full.webp?w=480&h=480",
        },
    },
    "profile-banner": {
        hash: "d188d2a966eb85ce754aee5d2b51254c",
        testURLs: {
            Hero: "https://img.guildedcdn.com/UserBanner/d188d2a966eb85ce754aee5d2b51254c-Hero.png",
            "Hero-size": "https://img.guildedcdn.com/UserBanner/d188d2a966eb85ce754aee5d2b51254c-Hero.png?w=480&h=480",
        },
    },
    "team-banner": {
        hash: "80e1c846259c58cf85a9175515a6b148",
        testURLs: {
            Hero: "https://img.guildedcdn.com/TeamBanner/80e1c846259c58cf85a9175515a6b148-Hero.png",
            "Hero-size": "https://img.guildedcdn.com/TeamBanner/80e1c846259c58cf85a9175515a6b148-Hero.png?w=480&h=480",
        },
    },
    "team-emoji": {
        hash: "d188d2a966eb85ce754aee5d2b51254c",
        testURLs: {
            "Full-apng": "https://img.guildedcdn.com/CustomReaction/d188d2a966eb85ce754aee5d2b51254c-Full.apng",
            "Full-apng-size": "https://img.guildedcdn.com/CustomReaction/d188d2a966eb85ce754aee5d2b51254c-Full.apng?w=480&h=480",
            "Full-webp": "https://img.guildedcdn.com/CustomReaction/d188d2a966eb85ce754aee5d2b51254c-Full.webp",
            "Full-webp-size": "https://img.guildedcdn.com/CustomReaction/d188d2a966eb85ce754aee5d2b51254c-Full.webp?w=480&h=480",
        },
    },
    "team-icon": {
        hash: "e656b45d5965dd5a95894f5cb8496acb",
        testURLs: {
            Large: "https://img.guildedcdn.com/TeamAvatar/e656b45d5965dd5a95894f5cb8496acb-Large.png",
            Medium: "https://img.guildedcdn.com/TeamAvatar/e656b45d5965dd5a95894f5cb8496acb-Medium.png",
            Small: "https://img.guildedcdn.com/TeamAvatar/e656b45d5965dd5a95894f5cb8496acb-Small.png",
        },
    },
    "user-avatar": {
        hash: "ad69d66812244bf783f388d8d0b258c9",
        testURLs: {
            Large: "https://img.guildedcdn.com/UserAvatar/ad69d66812244bf783f388d8d0b258c9-Large.png",
            Medium: "https://img.guildedcdn.com/UserAvatar/ad69d66812244bf783f388d8d0b258c9-Medium.png",
            Small: "https://img.guildedcdn.com/UserAvatar/ad69d66812244bf783f388d8d0b258c9-Small.png",
        },
    },
};

describe("Test route building methods", () => {
    describe("Avatar URL route", () => {
        for (const size of ["Small", "Medium", "Large"] as const) {
            it(`Valid URL when size ${size}`, () => {
                expect(ROUTES.ASSETS.AVATAR_URL(TEST_DATA["user-avatar"].hash, size)).toStrictEqual(TEST_DATA["user-avatar"].testURLs[size]);
            });
        }
        it("Valid URL when no size passed", () => {
            expect(ROUTES.ASSETS.AVATAR_URL(TEST_DATA["user-avatar"].hash)).toStrictEqual(TEST_DATA["user-avatar"].testURLs.Medium);
        });
    });
    describe("Chat-Image URL route", () => {
        it("Valid URL", () => {
            expect(ROUTES.ASSETS.IMAGE_IN_CHAT(TEST_DATA["chat-image"].hash, "Full")).toStrictEqual(TEST_DATA["chat-image"].testURLs.Full);
        });
        it("Valid URL when no size passed", () => {
            expect(ROUTES.ASSETS.IMAGE_IN_CHAT(TEST_DATA["chat-image"].hash)).toStrictEqual(TEST_DATA["chat-image"].testURLs.Full);
        });
        it("Valid URL when size params", () => {
            expect(ROUTES.ASSETS.IMAGE_IN_CHAT(TEST_DATA["chat-image"].hash, "Full", 480, 480)).toStrictEqual(
                TEST_DATA["chat-image"].testURLs["Full-size"],
            );
        });
    });
    describe("Profile-Banner URL route", () => {
        it("Valid URL", () => {
            expect(ROUTES.ASSETS.PROFILE_BANNER(TEST_DATA["profile-banner"].hash, "Hero")).toStrictEqual(TEST_DATA["profile-banner"].testURLs.Hero);
        });
        it("Valid URL when no size passed.", () => {
            expect(ROUTES.ASSETS.PROFILE_BANNER(TEST_DATA["profile-banner"].hash)).toStrictEqual(TEST_DATA["profile-banner"].testURLs.Hero);
        });
        it("Valid URL when size params", () => {
            expect(ROUTES.ASSETS.PROFILE_BANNER(TEST_DATA["profile-banner"].hash, "Hero", 480, 480)).toStrictEqual(
                TEST_DATA["profile-banner"].testURLs["Hero-size"],
            );
        });
    });
    describe("Team-Banner URL route", () => {
        it("Valid URL", () => {
            expect(ROUTES.ASSETS.TEAM_BANNER(TEST_DATA["team-banner"].hash, "Hero")).toStrictEqual(TEST_DATA["team-banner"].testURLs.Hero);
        });
        it("Valid URL when no size passed", () => {
            expect(ROUTES.ASSETS.TEAM_BANNER(TEST_DATA["team-banner"].hash)).toStrictEqual(TEST_DATA["team-banner"].testURLs.Hero);
        });
        it("Valid URL when size params", () => {
            expect(ROUTES.ASSETS.TEAM_BANNER(TEST_DATA["team-banner"].hash, "Hero", 480, 480)).toStrictEqual(
                TEST_DATA["team-banner"].testURLs["Hero-size"],
            );
        });
    });
    describe("Team-Emoji URL route", () => {
        it("Valid URL when no size passed", () => {
            expect(ROUTES.ASSETS.TEAM_EMOJI(TEST_DATA["team-emoji"].hash, undefined, "WEBP")).toStrictEqual(
                TEST_DATA["team-emoji"].testURLs["Full-webp"],
            );
        });
        it("Valid URL when WEBP", () => {
            expect(ROUTES.ASSETS.TEAM_EMOJI(TEST_DATA["team-emoji"].hash, "Full", "WEBP")).toStrictEqual(
                TEST_DATA["team-emoji"].testURLs["Full-webp"],
            );
        });
        it("Valid URL when WEBP & size params", () => {
            expect(ROUTES.ASSETS.TEAM_EMOJI(TEST_DATA["team-emoji"].hash, "Full", "WEBP", 480, 480)).toStrictEqual(
                TEST_DATA["team-emoji"].testURLs["Full-webp-size"],
            );
        });
        it("Valid URL when APNG", () => {
            expect(ROUTES.ASSETS.TEAM_EMOJI(TEST_DATA["team-emoji"].hash, "Full", "APNG")).toStrictEqual(
                TEST_DATA["team-emoji"].testURLs["Full-apng"],
            );
        });
        it("Valid URL when APNG & size params", () => {
            expect(ROUTES.ASSETS.TEAM_EMOJI(TEST_DATA["team-emoji"].hash, "Full", "APNG", 480, 480)).toStrictEqual(
                TEST_DATA["team-emoji"].testURLs["Full-apng-size"],
            );
        });
    });
    describe("Team-Icon URL route", () => {
        for (const size of ["Small", "Medium", "Large"] as const) {
            it(`Valid URL when size ${size}`, () => {
                expect(ROUTES.ASSETS.TEAM_ICON(TEST_DATA["team-icon"].hash, size)).toStrictEqual(TEST_DATA["team-icon"].testURLs[size]);
            });
        }
        it("Valid URL when no size passed", () => {
            expect(ROUTES.ASSETS.TEAM_ICON(TEST_DATA["team-icon"].hash)).toStrictEqual(TEST_DATA["team-icon"].testURLs.Medium);
        });
    });
});
