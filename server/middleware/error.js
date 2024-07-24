export default {
  // Unsupported routes (404)
  notFound: (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    console.log(error)
    res.status(404)
    next(error)
  },

  // Error Handler
  errorHandler: (error, req, res, next) => {
    if (res.headerSent) {
      return next(error)
    }
    console.log(error)
    res
      .status(error.code || 500)
      .json({ message: error.message || 'An unknown error occured' })
  },
}
