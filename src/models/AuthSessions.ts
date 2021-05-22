import mongoose from 'mongoose'

const { model, Schema } = mongoose

const authSessionsSchema = new Schema(
  {
    codeVerifier: String,
    discordUserId: String,
  },
  { timestamps: true }
)

const AuthSessions = model('auth_sessions', authSessionsSchema)

export { AuthSessions, authSessionsSchema }
