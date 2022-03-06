import Client from "../Client";

export default class Base<T = { id: string }, R = string> {
    // Identifier of this structrure
    public id: R;
    // Bare data of this structure
    public raw: T;

    constructor(public readonly client: Client, data: { id: R } & T) {
        this.id = data.id;
        this.raw = data;
    }
}
