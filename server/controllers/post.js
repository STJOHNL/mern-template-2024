import asyncHandler from 'express-async-handler'
import Post from '../models/Post.js'
import {
  deleteImage,
  uploadAndReplaceImage,
} from '../middleware/fileHandler.js'

export default {
  // @desc Get Posts
  // @route GET /api/post
  // @access PRIVATE
  getPosts: asyncHandler(async (req, res, next) => {
    const posts = await Post.find()

    res.status(200).json(posts)
  }),

  // @desc Get Post
  // @route GET /api/post/:id
  // @access PRIVATE
  getPost: asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id)

    res.status(200).json(post)
  }),

  // @desc Create Post
  // @route POST /api/post
  // @access PRIVATE
  createPost: asyncHandler(async (req, res, next) => {
    const { title, body, buttonLink, buttonText, creator } = req.body

    let newFileName
    // Handle file upload
    if (req.files && req.files.image) {
      try {
        newFileName = await uploadAndReplaceImage(req.files.image)
      } catch (err) {
        if (err.message === 'Image is too big. Should be less than 3MB') {
          return res.status(422).json({ message: err.message })
        } else if (err.message === 'Error uploading file') {
          return res.status(500).json({ message: err.message })
        } else {
          throw err // Let asyncHandler handle unexpected errors
        }
      }
    }

    // Update post document
    const post = await Post.create({
      title,
      body,
      buttonLink,
      buttonText,
      image: newFileName || '',
      creator,
    })

    res.status(201).json(post)
  }),

  // @desc Edit Post
  // @route PUT /api/post
  // @access PRIVATE
  editPost: asyncHandler(async (req, res, next) => {
    let { id, title, body, buttonLink, buttonText, creator } = req.body

    const post = await Post.findById(id)

    let newFileName
    // Handle file upload
    if (req.files && req.files.image) {
      try {
        newFileName = await uploadAndReplaceImage(req.files.image, post.image)
      } catch (err) {
        if (err.message === 'Image is too big. Should be less than 3MB') {
          return res.status(422).json({ message: err.message })
        } else if (err.message === 'Error uploading file') {
          return res.status(500).json({ message: err.message })
        } else {
          throw err // Let asyncHandler handle unexpected errors
        }
      }
    }

    // Update post document
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        body,
        buttonLink,
        buttonText,
        image: newFileName || post.image,
        creator,
      },
      {
        new: true,
      }
    )

    res.status(200).json(updatedPost)
  }),

  // @desc Delete Posts
  // @route DELETE /api/post/:id
  // @access PRIVATE
  deletePost: asyncHandler(async (req, res, next) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id)
    // Delete image from database
    if (deletedPost.image?.length) {
      deleteImage(deletedPost.image)
    }

    res.status(200).json(deletedPost)
  }),
}
