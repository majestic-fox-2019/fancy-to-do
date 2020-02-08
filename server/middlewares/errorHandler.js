module.exports = function(err, req, res, next) {
  console.log(err)
  if (err.name == 'SequelizeValidationError') {
    let errors = []
    err.errors.forEach((error) => {
      errors.push(error.message)
    })
    res.status(400).json(errors)
  } else if (err.name == 'SequelizeUniqueConstraintError') {
    res.status(400).json(err.errors[0].message)
  } else if (err.name == 'JsonWebTokenError') {
    res.status(401).json('Invalid access token')
  } else if (err.message == 'Login error') {
    res.status(err.status).json('Invalid email or password')
  } else if (err.status == 404) {
    res.status(err.status).json(err.message)
  } else if (err.status == 400) {
    res.status(err.status).json(err.message)
  } else if (err.status == 401) {
    res.status(err.status).json(err.message)
  } else {
    res.status(500).json(err)
  }
}
