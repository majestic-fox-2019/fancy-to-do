module.exports = (err, req, res, next) => {
  let code = null
  let errors = []
  if (err.errCode) {
    code = err.errCode
    res.status(code).json({
      code: code,
      err: err.msg
    })
  } else if (err.errors) {
    if (err.name == 'SequelizeValidationError') {
      code = 400
      err.errors.forEach(el => {
        errors.push(el.message)
      })
      res.status(code).json({
        code: code,
        err: errors
      })
    }
  } else if (err.name == 'JsonWebTokenError') {
    console.log(err.name)
    code = 401
    errors.push('You must login to do this')
    res.status(code).json({
      code: code,
      err: errors
    })
  } else {
    code = 500
    res.status(code).json({
      code: code,
      err: 'Internal server error'
    })
  }
}
