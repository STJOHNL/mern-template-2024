import asyncHandler from 'express-async-handler'

export default {
  // @desc Index page for API
  // @route GET /api/
  // @access PUBLIC
  index: asyncHandler(async (req, res, next) => {
    return res.status(200).json({ message: 'MERN Template API' })
  }),
}
