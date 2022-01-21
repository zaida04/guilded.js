import type { Client } from '../../Client';

export default abstract class GatewayEventHandler {
    public constructor(public client: Client) {}
    public partialEnabled(): boolean {
        return !!this.client.options?.partials?.length;
    }
}