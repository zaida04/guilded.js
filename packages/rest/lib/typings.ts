export type RestOptions = {
    /**
     * How many times to retry a request that's been ratelimited before failing
     */
    maxRatelimitRetryLimit?: number;
    /**
     * The base url of the API you want to send requests to. By default, this will send it to guilded's rest API. This is meant for big bot developers who want to use a proxy rest system.
     */
    proxyURL?: string;
    /**
     * How long to delay each request by.
     */
    restOffset?: number;
    /**
     * The bot token to be used for making requests.
     */
    token: string;
    /**
     * The version of the API to be used for making requests. By default, this will use the latest version that the library supports.
     */
    version?: 1;
}
