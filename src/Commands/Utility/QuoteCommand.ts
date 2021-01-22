import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat, TextChannel } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class QuoteCommand extends Command {
    public constructor() {
        super("quote", {
            aliases: ["quote", 'qt'],
            category: "Utility",
            quoted: true,
            args: [
                {
                    id: "args",
                    type: "array",
                    match: "rest",
                }
            ],
            description: {
                content: "Quotes someone",
                usage: "quote",
                example: [
                    "!quote https://canary.discord.com/channels/748956745409232945/777886689300709406/777889131829264384"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public async exec(message: Message, { args }) {
        let splito = args.split(' ')
        for( var i = 0; i < splito.length; i++){ 
    
        if ( splito[i].includes('discord.com/channels')) { 
    
            var item = splito.splice(i, 1)
        }}
        
        let thing = (<string[]>item).join()
        let split = thing.split('/')
        if(!split[5] || !split[6]) return message.reply("message not found")
        let channel = split[5]
        let msgid = split[6]
        let chan = await this.client.channels.fetch(channel).catch(e => message.reply('message not found'))

        let msg = await (chan as TextChannel).messages.fetch(msgid).catch(e => message.reply('message not found'))


        if (!message.member.guild.me.hasPermission(["MANAGE_WEBHOOKS"])) { return message.channel.send(
        new MessageEmbed()
                    .setAuthor(msg.author.tag, msg.author.avatarURL())
                    .setDescription(msg.content)
                    .setFooter("didnt have WebhookPermissions so send a embed instead")
        )
        }
        // magic
        let webhook = await (chan as TextChannel).createWebhook(msg.author.tag).then(webhook => webhook.edit({avatar: msg.author.displayAvatarURL({ size: 2048, format: "png" })}))
        //
        await webhook.send(msg.content).then(msg => webhook.delete()).catch(e => message.reply('Something went wrong'))
        
    }
}