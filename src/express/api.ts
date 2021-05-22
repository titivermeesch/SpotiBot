import axios from 'axios'
import express from 'express'
import qs from 'qs'
import User from '../models/User'

const app = express()

const clientId = process.env.SPOTIFY_CLIENT
app.get('/login/:discordId', (req, res) => {
  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${process.env.REDIRECT_URL}/success&scope=user-read-playback-state,user-modify-playback-state,user-read-currently-playing&state=${req.params.discordId}`
  res.redirect(url)
})

app.get('/success', async (req, res) => {
  res.status(200).send('Thanks for logging in. You can close this page')

  const postRes = await axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    data: qs.stringify({
      client_id: clientId,
      client_secret: process.env.SPOTIFY_SECRET,
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: `${process.env.REDIRECT_URL}/success`,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  await User.create({
    discordUserId: req.query.state,
    accessToken: postRes.data.access_token,
    refreshToken: postRes.data.refresh_token,
  })
})

app.listen(3000, () => console.log('Express backend running on :3000'))
