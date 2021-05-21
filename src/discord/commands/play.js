import axios from 'axios'
import { User } from '../../models/User.js'
import { getUserDevices } from '../../spotify/devices.js'

export default {
  name: 'play',
  description: 'Play some music',
  async execute(msg, args) {
    const user = await User.findOne({ discordUserId: msg.author.id })
    if (!user) {
      await msg.author.send('Please link your spotify account with !link')
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
        console.log(searchResults?.tracks?.items?.[0].uri)
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
