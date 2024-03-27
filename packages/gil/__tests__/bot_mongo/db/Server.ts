import mongoose, { Schema, Document } from "mongoose";

// This is for typescript
export interface IServer extends Document {
	server_id: string;
	prefix: string;
	premium_level: string;
	staff_roles: string[];
}

// This is for mongodb to know what we are storing
const ServerSchema: Schema = new Schema({
	server_id: { type: String, required: true },
	prefix: { type: String, required: false },
	premium_level: { type: String, required: false, default: null },
	staff_roles: { type: Array, required: false, default: [] },
});

const Server = mongoose.model<IServer>("Server", ServerSchema);

export default Server;
