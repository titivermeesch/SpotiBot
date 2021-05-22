import fs from 'fs'
import path from 'path'
import Command from '../discord/commands/Command'
import devices from '../discord/commands/devices'
import link from '../discord/commands/link'
import unlink from '../discord/commands/unlink'
import join from '../discord/commands/join'
import play from '../discord/commands/play'

const importAllCommands = (): Map<String, Command> => {
  const commands = new Map<String, Command>()

  commands.set(devices.name, devices)
  commands.set(link.name, link)
  commands.set(unlink.name, unlink)
  commands.set(join.name, join)
  commands.set(play.name, play)

  return commands
}

export { importAllCommands }
