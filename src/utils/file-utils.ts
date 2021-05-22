import fs from 'fs'

/**
 * Get all command configuration files
 */
const getAllCommandFiles = (): string[] =>
  fs
    .readdirSync('./src/discord/commands')
    .filter(file => file.endsWith('.ts') && file !== 'Command.ts')

export { getAllCommandFiles }
