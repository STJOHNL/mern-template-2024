import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import {
  deleteImage,
  uploadAndReplaceImage,
} from '../middleware/fileHandler.js'

export default {
  // @desc Get Users
  // @route GET /api/user
  // @access PRIVATE
  getUsers: asyncHandler(async (req, res, next) => {
    const users = await User.find().select('-password')

    res.status(200).json(users)
  }),

  // @desc Get User
  // @route GET /api/user/:id
  // @access PRIVATE
  getUser: asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).select('-password')

    res.status(200).json(user)
  }),

  // @desc Create User
  // @route POST /api/user
  // @access PRIVATE
  createUser: asyncHandler(async (req, res, next) => {
    let { fName, lName, email, password, role } = req.body
    email = email.toLowerCase()
    console.log(role)
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400).json({ message: 'User with that email already exists' })
      return
    }

    let newFileName
    // Handle file upload
    if (req.files && req.files.profileImage) {
      try {
        newFileName = await uploadAndReplaceImage(req.files.profileImage)
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

    const user = await User.create({
      fName,
      lName,
      email,
      password, // Password hashing in User model
      profileImage: newFileName || '',
      role,
    })

    if (user) {
      const userObj = user.toObject()
      delete userObj.password
      res.status(201).json(userObj)
    } else {
      res.status(400).json({ error: error.message })
    }
  }),

  // @desc Edit User
  // @route PUT /api/user
  // @access PRIVATE
  editUser: asyncHandler(async (req, res, next) => {
    let { id, updatingUserID, email, fName, lName, role } = req.body

    // Get users from db
    const updatingUser = await User.findById(updatingUserID)

    if (!updatingUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check permission to update user
    if (updatingUser.id !== id && updatingUser.role !== 'Admin') {
      return res
        .status(403)
        .json({ message: 'You do not have permission to update this user' })
    }

    const user = await User.findById(id)

    let newFileName
    // Handle file upload
    if (req.files && req.files.profileImage) {
      try {
        newFileName = await uploadAndReplaceImage(
          req.files.profileImage,
          user.profileImage
        )
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

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        email,
        fName,
        lName,
        role,
        profileImage: newFileName || user.image,
      },
      {
        new: true,
      }
    )

    res.status(200).json(updatedUser)
  }),

  // @desc Delete Users
  // @route DELETE /api/user/:id
  // @access PRIVATE
  deleteUser: asyncHandler(async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    // Delete image from database
    if (deletedUser.profileImage?.length) {
      deleteImage(deletedUser.profileImage)
    }
    res.status(200).json(deletedUser)
  }),
}
