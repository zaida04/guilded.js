module.exports = {
	name: "echo",
	aliases: ["speak", "talk"],
	execute: (msg, args) => {
		if (!args.length) return msg.send("You must give me something to echo!");
		msg.send(args.join(" "));
	},
};
