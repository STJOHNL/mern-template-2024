import asyncHandler from 'express-async-handler'
import User from '../models/User.js'
import {
  generateToken,
  generateResetToken,
} from '../middleware/generateToken.js'
import { uploadAndReplaceImage } from '../middleware/fileHandler.js'
import { sendPasswordReset } from '../mail/email.js'

export default {
  // @desc Log user in
  // @route POST /api/login
  // @access PUBLIC
  login: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' })
    }

    if (user && (await user.matchPassword(password))) {
      const userObj = user.toObject()
      delete userObj.password
      const token = generateToken(res, userObj)

      return res.status(201).json({ token })
    }
    return res.status(404).json({ message: 'Invalid credentials' })
  }),

  // @desc Register user
  // @route POST /api/register
  // @access PUBLIC
  register: asyncHandler(async (req, res, next) => {
    let { fName, lName, email, password } = req.body
    email = email.toLowerCase()

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
    })

    if (user) {
      const userObj = user.toObject()
      delete userObj.password
      const token = generateToken(res, userObj)
      res.status(201).json({ token, userObj })
    } else {
      res.status(400).json({ error: error.message })
    }
  }),

  // @desc Logout user
  // @route POST /api/logout
  // @access PUBLIC
  logout: asyncHandler(async (req, res, next) => {
    const cookies = req.cookies
    if (!cookies?.token) return res.sendStatus(204) // No content
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })

    res.json({ message: 'User logged out' })
  }),

  // @desc Send forgot password email
  // @route POST /api/forgot-password
  // @access PUBLIC
  forgotPassword: asyncHandler(async (req, res, next) => {
    let { email } = req.body
    email = email?.toLowerCase()
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ message: 'User with that email does not exist' })
    }

    const resetToken = generateResetToken()
    user.resetToken = resetToken
    user.resetExpires = Date.now() + 3600000 // 1 hour
    await user.save()

    let link = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

    sendPasswordReset(user, link)
    res.status(201).json({ message: 'Email has been sent!' })
  }),

  // @desc Reset users password
  // @route POST /api/reset-password
  // @access PUBLIC
  resetPassword: asyncHandler(async (req, res, next) => {
    const { token, password } = req.body

    const user = await User.findOne({
      resetToken: token,
      resetExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' })
    }

    user.password = password
    user.resetToken = undefined
    user.resetExpires = undefined

    await user.save()
    res.status(201).json({ message: 'Password updated!' })
  }),
}
