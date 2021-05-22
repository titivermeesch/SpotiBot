import User from '../../models/User'

export default {
  name: 'unlink',
  description: 'Unlink your spotify account',
  async execute(msg) {
    const user = await User.findOne({ discordUserId: msg.author.id })
    if (user) {
      await User.findOneAndDelete({ discordUserId: msg.author.id })
      await msg.channel.send({
        embed: { description: 'We deleted your account information' },
      })
    } else {
      await msg.channel.send({
        embed: { description: 'You are not linked yet' },
      })
    }
  },
}
