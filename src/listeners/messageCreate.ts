import type { Events } from '@sapphire/framework';
import { Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';
import { application_channels } from '../config/config.json'
import { TextChannel } from 'discord.js';
import { isNullishOrEmpty } from '@sapphire/utilities';

export class UserEvent extends Listener<typeof Events.MessageCreate> {
	public async run(message: Message) {

        if(message.author.id == message.client.id)
            return

        if(!message.author.bot)
            return

        if(!(message.channel instanceof TextChannel))
            return

        if(!(application_channels.includes(message.channelId)))
            return

        if(!message.embeds.length)
            return

        if(isNullishOrEmpty(message.embeds[0].author?.name))
            return

        return message.channel.threads.create({
            name: "" + message.embeds[0].author?.name,
            startMessage: message
        })

	}
}
