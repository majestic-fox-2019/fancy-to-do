const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token
    const user = jwt.verify(token, )
    req.user = user
    next()
  } catch (error) {
    res.status(404).json(error.message)
  }
}