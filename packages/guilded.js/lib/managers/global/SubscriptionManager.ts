import type { ServerSubscriptionTierType } from "../../structures/Subscription";
import { ServerSubscriptionTier } from "../../structures/Subscription";
import { GlobalManager } from "./GlobalManager";

/**
 * A class representing a global subscription tier manager.
 */
export class GlobalSubscriptionManager extends GlobalManager {
  /**
   * Fetches a subscription tier from a server.
   *
   * @param serverId The ID of the server to fetch the subscription tier from.
   * @param tier The type of subscription tier to fetch.
   * @returns A Promise that resolves with the fetched subscription tier.
   */
  async fetch(
    serverId: string,
    tier: ServerSubscriptionTierType
  ): Promise<ServerSubscriptionTier> {
    const data =
      await this.client.rest.router.serverSubscriptions.serverSubscriptionTierRead(
        { serverId, serverSubscriptionTierType: tier }
      );
    return new ServerSubscriptionTier(this.client, data.serverSubscriptionTier);
  }

  /**
   * Fetches all the subscription tiers from a server.
   *
   * @param serverId The ID of the server to fetch subscription tiers from.
   * @returns A Promise that resolves with an array of subscription tiers.
   */
  async fetchMany(serverId: string): Promise<ServerSubscriptionTier[]> {
    const data =
      await this.client.rest.router.serverSubscriptions.serverSubscriptionTierReadMany(
        {
          serverId,
        }
      );
    const serverSubscriptionTiers: ServerSubscriptionTier[] = [];
    for (const tier of data.serverSubscriptionTiers) {
      serverSubscriptionTiers.push(
        new ServerSubscriptionTier(this.client, tier)
      );
    }

    return serverSubscriptionTiers;
  }
}
