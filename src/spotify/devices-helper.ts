import axios from 'axios'
import { IUser } from '../models/User'
import { refreshUserAccessToken } from './refresh-token'

const getUserDevices = async (user: IUser) => {
  try {
    const res = await axios.get(
      'https://api.spotify.com/v1/me/player/devices',
      {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      }
    )

    return res.data?.devices
  } catch (e) {
    refreshUserAccessToken(user)
  }
}

export { getUserDevices }
