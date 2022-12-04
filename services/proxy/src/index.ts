import { Buffer } from "node:buffer";
import { createServer } from "node:http";
import { GuildedAPIError, RestManager } from "@guildedjs/rest";
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") config();

for (const envVar of ["GUILDED_TOKEN"]) {
	if (!process.env[envVar]) throw new Error(`Missing environment variable ${envVar}`);
}

const rest = new RestManager({ maxRatelimitRetryLimit: 0, token: process.env.GUILDED_TOKEN! });
const server = createServer((req, res) => {
	res.setHeader("Content-Type", "application/json");
	if (!req.url || !req.method) {
		res.statusCode = 400;
		return res.end(JSON.stringify({ error: { message: "You must supply a valid path and method." } }));
	}

	console.log(`${req.method} ${req.url}`);

	const body: Uint8Array[] = [];
	req.on("data", (chunk) => {
		body.push(chunk);
	}).on("end", async () => {
		try {
			const [request, requestBody] = await rest.make(
				{
					path: req.url!,
					method: req.method!,
					body: body.length ? Buffer.concat(body).toString() : undefined,
				},
				true,
				0,
				{
					returnAsText: true,
					bodyIsJSON: false,
				},
			);
			const resBodyParsed = await requestBody;

			res.statusCode = request.status;
			res.end(resBodyParsed);
		} catch (error) {
			if (error instanceof GuildedAPIError) {
				res.statusCode = Number(error.code);
				return res.end(JSON.stringify({ error: { message: error.message } }));
			}

			res.statusCode = 500;
			console.log(error);
			return res.end(JSON.stringify({ error: { message: "Internal server error." } }));
		}
	});
});

const port = process.env.PORT ? Number(process.env.PORT) : 3_456;
server.listen(port, () => {
	console.log(`Proxy server started on ${port}`);
});
