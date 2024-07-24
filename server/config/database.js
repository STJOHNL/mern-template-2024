import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'

const connectDB = asyncHandler(async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL)
  console.log(`MongoDB Connected`)
})

export default connectDB
