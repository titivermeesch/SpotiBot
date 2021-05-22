import { Message } from 'discord.js'
import User from '../../models/User'
import { getUserDevices } from '../../spotify/devices-helper'

export default {
  name: 'devices',
  description: 'See all your available devices',
  async execute(msg: Message, args: String[]): Promise<void> {
    const user = await User.findOne({ discordUserId: msg.author.id })

    if (user) {
      const devices = await getUserDevices(user)
      let message =
        'Here is a list of devices you can use. React with 1 of the numbers to set your default device: \n\n'
      devices.forEach((device, i) => (message += `${i + 1}: ${device.name} \n`))

      await msg.author.send(message)
    } else {
      await msg.author.send(
        `Please go to ${process.env.REDIRECT_URL}/login/${msg.author.id}`
      )
    }
  },
}
