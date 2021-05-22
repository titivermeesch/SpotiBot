import { Message } from 'discord.js'
import User from '../../models/User'

export default {
  name: 'join',
  description: 'Make Spotibot join your current channel',
  async execute(msg: Message, args: String[]): Promise<void> {
    const user = await User.findOne({ discordUserId: msg.author.id })
    if (user) {
      await msg.author.send('You are already logged in, happy listening!')
    } else {
      await msg.author.send(
        `Please go to http://localhost:3000/login/${msg.author.id}`
      )
    }
  },
}
