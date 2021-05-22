import { Message } from 'discord.js'
import User from '../../models/User'

export default {
  name: 'join',
  description: 'Make Spotibot join your current channel',
  async execute(msg: Message, args: String[]): Promise<void> {
    const user = await User.findOne({ discordUserId: msg.author.id })
    if (user) {
      if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join()
        console.log(connection)
      } else {
        msg.channel.send({
          embed: { description: 'Please join a voice chat first' },
        })
      }
    } else {
      await msg.author.send(
        `Please go to ${process.env.REDIRECT_URL}/login/${msg.author.id}`
      )
    }
  },
}
