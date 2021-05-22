import { Client } from 'discord.js'
import Command from './commands/Command'
import { getAllCommandFiles } from '../utils/file-utils'

const client = new Client()
const commands = new Map<String, Command>()
const commandFiles = getAllCommandFiles()

for (const file of commandFiles) {
  import(`./commands/${file}`).then(command =>
    commands.set(command.default?.name, command.default)
  )
}

client.on('message', msg => {
  if (!msg.content.startsWith('!') || msg.author.bot) {
    return
  }

  const args = msg.content.slice(1).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (!commands.has(command)) {
    return
  }

  try {
    commands.get(command).execute(msg, args)
  } catch (error) {
    console.error(error)
    msg.reply('there was an error trying to execute that command!')
  }
})

client.login(process.env.DISCORD_TOKEN)

export { client }
