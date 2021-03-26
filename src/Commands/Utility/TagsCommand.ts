import { Command } from "discord-akairo";
import { MessageEmbed, Message } from "discord.js";

export default class TagsCommand extends Command {
	public constructor() {
		super("tags", {
			aliases: ["tags"],
			category: "Developer",
			quoted: true,
			description: {
				content: "",
				usage: "tags",
				example: ["tags"]
			},
			clientPermissions: ["SEND_MESSAGES"],
			ratelimit: 3,
			channel: "guild"
		});
	}

	public async exec(message: Message) {
		await this.client.tags.ensure(message.guild.id, {});
		let tags = this.client.tags.get(message.guild.id);

		tags = Object.keys(tags)
			.toString()
			.replace(/(\r\n|\n|\r|,)/gm, ", ");
		// // console.log(tags)

		const Embed = new MessageEmbed().setTitle(`tags in ${message.guild}`).setDescription(tags).setColor(this.client.consts.colors.green);
		message.reply({ embed: Embed, allowedMentions: { repliedUser: false } });
	}
}
