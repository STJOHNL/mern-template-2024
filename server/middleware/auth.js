import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token
  token = req?.cookies?.token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET)

    next()
  } else {
    return res.status(401).json({ message: 'You must log in first.' })
  }
})

export default protect
