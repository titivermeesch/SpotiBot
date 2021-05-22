import mongoose from 'mongoose'

const connectDatabase = () => {
  mongoose.connect(
    'mongodb+srv://tristan:medionakoya@main.rfmdr.mongodb.net/bot?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
}

export default connectDatabase
