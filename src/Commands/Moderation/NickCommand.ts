import { Command } from "discord-akairo";
import { GetMember } from "../../lib/Utils";
import { MessageEmbed } from "discord.js";

export default class NickCommand extends Command {
	public constructor() {
		super("nick", {
			aliases: ["nick", "changenick"],
			category: "Moderation",
			quoted: true,
			args: [
				{
					id: "name",
					type: "string",
				},
			],
			description: {
				content: "Change the nickname of a user",
				usage: "nick",
				example: ["nick"],
			},
			clientPermissions: ["MANAGE_NICKNAMES", "SEND_MESSAGES"],
			userPermissions: ["MANAGE_NICKNAMES"],
			ratelimit: 3,
			channel: "guild",
		});
	}

	public async exec(message, { name }) {
		const NewName = name.split(" ").splice(1).join(" ");
		const user = await GetMember(message, name);
		if (!user) return message.util.send("user not found");
		try {
			await user.setNickname(NewName, `${message.author.tag} Used nick.`);
			message.util.send("NickName Changed");
		} catch (err) {
			message.util.send("Sorry cant do", { allowedMentions: { repliedUser: false } });
		}
	}
}
