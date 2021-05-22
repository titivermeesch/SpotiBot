import axios from 'axios'
import qs from 'qs'
import User, { IUser } from '../models/User'

const refreshUserAccessToken = async (user: IUser): Promise<void> => {
  try {
    const data = qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: user.refreshToken,
      client_id: process.env.SPOTIFY_CLIENT,
      client_secret: process.env.SPOTIFY_SECRET,
    })

    const postRes = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    await User.updateOne(
      { discordUserId: user.discordUserId },
      { $set: { accessToken: postRes.data.access_token } }
    )
  } catch (e) {
    console.error(e)
  }
}

export { refreshUserAccessToken }
