import { Client } from 'discord.js'
import { importAllCommands } from '../utils/file-utils'

const client = new Client()
const commands = importAllCommands()

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
