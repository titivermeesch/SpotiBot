import mongoose from 'mongoose'

const { model, Schema } = mongoose

export interface IUser extends Document {
  discordUserId: string
  accessToken: string
  refreshToken: string
}

const userSchema = new Schema(
  {
    discordUserId: String,
    accessToken: String,
    refreshToken: String,
  },
  { timestamps: true }
)

export default model<IUser>('users', userSchema)
