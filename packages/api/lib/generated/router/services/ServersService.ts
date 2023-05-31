/* istanbul ignore file */
/* eslint-disable */
import type { Server } from "../models/Server";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ServersService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get a server
   * Fetch various information about a given server. Currently, the bot must be a member of the server in order to fetch its information.
   * @returns any Success
   * @throws ApiError
   */
  public serverRead({ serverId }: { serverId: string }): CancelablePromise<{
    server: Server;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/servers/{serverId}",
      path: {
        serverId: serverId,
      },
    });
  }
}
