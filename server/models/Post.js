import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    buttonLink: String,
    buttonText: String,
    image: String,
    creator: String,
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

export default Post
