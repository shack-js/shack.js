import mongoose from 'mongoose'
import { Cat } from '../common/Cat.mjs'

mongoose.connect(
  process.env.MONGODB || 'mongodb://localhost:27017/test',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

export default async () => {
  await new Cat({ name: 'Zildjian' }).save()
}
