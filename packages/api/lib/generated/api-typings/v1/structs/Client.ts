import type { WSPayload } from "../..";

export type ClientUserData = WSPayload<"_WelcomeMessage">["user"] & {
	createdBy: string;
	botId: string;
};
