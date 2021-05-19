import Discord from 'discord.js'

const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (msg) => {
  if (msg.content === '!login') {
    msg.author.send(`Please go to http://localhost:3000/login/${msg.author.id}`)
  }
})

client.login('ODQ0MjkyMzc1NjMwNDQ2NjEz.YKQSjA.Y-P5MRYMVYVRMLO0-w2bXMHD5zc')

export { client }
