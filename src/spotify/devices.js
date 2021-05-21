import axios from 'axios'

const getUserDevices = async user => {
  const res = await axios.get('https://api.spotify.com/v1/me/player/devices', {
    headers: { Authorization: `Bearer ${user.accessToken}` },
  })

  return res.data?.devices
}

export { getUserDevices }
