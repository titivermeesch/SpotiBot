import User from '../../models/User'

export default {
  name: 'link',
  description: 'Link your spotify account',
  async execute(msg, args) {
    const user = await User.findOne({ discordUserId: msg.author.id })
    if (user) {
      await msg.channel.send({
        embed: { description: 'You are already logged in, happy listening!' },
      })
    } else {
      await msg.author.send({
        embed: {
          description: `Please go to ${process.env.REDIRECT_URL}/login/${msg.author.id}`,
        },
      })
    }
  },
}
