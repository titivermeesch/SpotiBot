![Discord](https://img.shields.io/discord/439618742633103370?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/titivermeesch/spotibot?style=for-the-badge)
![GitHub package.json version](https://img.shields.io/github/package-json/v/titivermeesch/spotibot?style=for-the-badge)

# SpotiBot

## What is this

SpotiBot is a Discord bot that allows music syncing between multiple users using their spotify account. This allows users to listen to high quality music in sync.

## Features

Since this bot is in an early stage, there are only a few features available right now:

- Authenticate with Spotify
- Query a list of all possible playback devices
- Search and play a track

## Commands

- !link: Link your spotify account
- !unlink: Remove your spotify account
- !devices: See a list of all your devices
- !play {music title}: Play the first result of the entered track title

## Installation

### Environment variables

The project expect some environment variables to be present. The `dev` script expects a `.env` file in your local version of the project containing the following values:

- DISCORD_TOKEN: Discord bot token
- SPOTIFY_SECRET: Spotify secret key
- SPOTIFY_CLIENT: Spotify client id (aka public key)
- REDIRECT_URL: This is the Auth0 url that you need to configure on the Spotify dashboard

### App install

Run these commands in the main project folder

- `npm install`
- `npm start`

## Limitations

- A user requires a Spotify Premium account to listen to music.

## Contributing

You can create PRs as long as you respect the currently configured code style. Prettier and Eslint are therefor required in your working environment.