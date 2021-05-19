import axios from 'axios'
import express from 'express'
import qs from 'qs'

const app = express()

const clientId = 'c56d4108a56d4b71be19528c8732301f'
const clientSecret = '12b3a73ffab743d084e752e82cceb3a7'
app.get('/login/:discordId', (req, res) => {
  const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/success&scope=user-read-playback-state,user-modify-playback-state,user-read-currently-playing&state=${req.params.discordId}`
  res.redirect(url)
})

app.get('/success', async (req, res) => {
  console.log(req.query)
  res.status(200).send('Logged in')

  const postRes = await axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    data: qs.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: 'http://localhost:3000/success',
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  console.log(postRes)
})

app.listen(3000, () => console.log('Express backend running on :3000'))
