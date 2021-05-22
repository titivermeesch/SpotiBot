import mongoose from 'mongoose'

const { model, Schema } = mongoose

const serversSchema = new Schema(
  {
    serverId: String,
    currentVoiceChannel: {
      type: String,
      optional: true,
    },
  },
  { timestamps: true }
)

const Servers = model('servers', serversSchema)

export { Servers, serversSchema }
