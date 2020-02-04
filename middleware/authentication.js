const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.headers.token
    const user = jwt.verify(token, 'generate token')
    req.user = user
    next()
  } catch (error) {
    res.status(404).json({ message: 'invalid token!' })
  }
}