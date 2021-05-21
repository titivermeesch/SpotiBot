import { User } from '../../models/User.js'

export default {
  name: 'link',
  description: 'Link your spotify account',
  async execute(msg, args) {
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
