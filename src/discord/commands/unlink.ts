import User from '../../models/User'

export default {
  name: 'unlink',
  description: 'Unlink your spotify account',
  async execute(msg) {
    const user = await User.findOne({ discordUserId: msg.author.id })
    if (user) {
      await User.findOneAndDelete({ discordUserId: msg.author.id })
      await msg.author.send('We deleted your account information')
    } else {
      await msg.author.send('You are not linked yet')
    }
  },
}
