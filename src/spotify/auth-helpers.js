import axios from 'axios'
import base64url from 'base64url'
import shajs from 'sha.js'
import { client } from '../discord/bot.js'
import { AuthSessions } from '../models/AuthSessions.js'
import { createHash } from '../utils/hash-generator.js'

const clientId = 'c56d4108a56d4b71be19528c8732301f'

const sendAuthLink = async (userId) => {
  const rawHash = createHash()
  const cryptedHash = shajs('sha256').update(rawHash).digest('hex')
  const base64hash = base64url(cryptedHash)

  const message = `Please login with this link to connect your Spotify account to SpotiBot:
   https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/success&code_challenge_method=S256&code_challenge=${base64hash}&scope=user-read-playback-state,user-modify-playback-state,user-read-currently-playing`

  await AuthSessions.create({ discordUserId: userId, codeVerifier: rawHash })

  const user = await client.users.fetch(userId)

  user.send(message)
}

const processAccessToken = async (code) => {
  console.log(code)
  axios.post(
    `https://accounts.spotify.com/api/token?client_id=${clientId}&grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/success&code_verifier=`
  )
}

export { sendAuthLink, processAccessToken }
