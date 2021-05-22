import axios from 'axios'
import User from '../../models/User'
import { getUserDevices } from '../../spotify/devices-helper'

export default {
  name: 'play',
  description: 'Play some music',
  async execute(msg, args) {
    const user = await User.findOne({ discordUserId: msg.author.id })
    if (!user) {
      await msg.channel.send({
        embed: { description: 'Please link your spotify account with !link' },
      })
    } else {
      const devices = await getUserDevices(user)
      const searchQuery = args.join(' ')
      const res = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      const searchResults = res.data

      if (searchResults?.tracks?.items) {
        axios.put(
          `https://api.spotify.com/v1/me/player/play?device_id=${devices[0].id}`,
          {
            uris: [searchResults?.tracks?.items?.[0].uri],
          },
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              Accept: 'application/json',
            },
          }
        )
      }
    }
  },
}
