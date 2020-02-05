module.exports = (err, req, res, next) => {
  let code = null
  let errors = []
  if (err.errCode) {
    code = err.errCode
    errors.push(err.msg)
  } else if (err.errors) {
    if (err.name == 'SequelizeValidationError') {
      code = 400
      err.errors.forEach(el => {
        errors.push(el.message)
      })
    }
  } else if (err.name == 'JsonWebTokenError') {
    code = 401
    errors.push('Sorry, you are not authorized')
  } else {
    code = 500
    errors.push('Internal server error')
  }

  res.status(code).json({
    code: code,
    err: errors
  })
}
