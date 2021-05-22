import { Message } from 'discord.js'

interface Command {
  name: string
  description: string
  execute(msg: Message, args: String[]): Promise<void>
}

export default Command
