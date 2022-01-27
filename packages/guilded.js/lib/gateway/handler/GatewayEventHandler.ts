import type { Client } from '../../Client';

export default abstract class GatewayEventHandler {
    public constructor(public client: Client) {}
}