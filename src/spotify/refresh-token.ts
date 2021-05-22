import axios from 'axios'
import qs from 'qs'
import { IUser } from '../models/User'

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
        Authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  } catch (e) {
    console.error(e)
  }
}

export { refreshUserAccessToken }
