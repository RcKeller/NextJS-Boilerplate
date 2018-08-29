module.exports = class Errors {
  constructor (router) {
    router.use(this.errorHandler)
  }
  errorHandler (err, req, res, next) {
    console.error('ERROR:', err)
    if (!err) return res.sendStatus(500)

    const error = { message: err.message || 'Internal Server Error.' }
    if (process.env.NODE_ENV === 'development') error.stack = err.stack

    if (err.errors) {
      error.errors = {}
      const { errors } = err
      for (const type in errors) {
        if (type in errors) {
          error.errors[type] = errors[type].message
        }
      }
    }

    res.status(err.status || 500).json(error)
  }
}
