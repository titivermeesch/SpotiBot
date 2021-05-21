import mongoose from 'mongoose'

const { model, Schema } = mongoose

const userSchema = new Schema(
  {
    discordUserId: String,
    accessToken: String,
    refreshToken: String
  },
  { timestamps: true }
)

const User = model('users', userSchema)

export { User, userSchema }
