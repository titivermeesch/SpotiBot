import Discord from 'discord.js'
import fs from 'fs'

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs
  .readdirSync('./src/discord/commands')
  .filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  import(`./commands/${file}`).then(command => {
    client.commands.set(command.default?.name, command.default)
  })
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (!msg.content.startsWith('!') || msg.author.bot) {
    return
  }

  const args = msg.content.slice(1).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (!client.commands.has(command)) {
    return
  }

  try {
    client.commands.get(command).execute(msg, args)
  } catch (error) {
    console.error(error)
    msg.reply('there was an error trying to execute that command!')
  }
})

// client.on('message', async (msg) => {
//   if (msg.author.bot) {
//     return
//   }

//   if (msg.content === '!help') {
//     const embed = {
//       title: 'SpotiBot help',
//       fields: [
//         {
//           name: '!unlink',
//           value:
//             'Remove your account from Spotibot. All your information will be removed',
//         },
//         {
//           name: '!link',
//         },
//       ],
//     }

//     await msg.channel.send({ embed })
//     return
//   }

//   if (msg.content === '!play') {
//     const user = await User.findOne({ discordUserId: msg.author.id })

//     if (!user) {
//       await msg.author.send('Please login first')
//     } else {
//       console.log(user.accessToken)
//       axios.put(
//         'https://api.spotify.com/v1/me/player/play',
//         { context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr' },
//         {
//           headers: {
//             Authorization: `Bearer ${user.accessToken}`,
//             Accept: 'application/json',
//           },
//         }
//       )
//     }
//   }
// })

client.login(process.env.DISCORD_TOKEN)

export { client }
