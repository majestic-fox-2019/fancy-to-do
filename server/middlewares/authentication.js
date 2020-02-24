const { verify } = require('../helpers/jwt')

module.exports = (req, res, next) => {
  const token = req.headers.token
  try {
    const payload = verify(token, process.env.JWT_SECRET)
    req.loggedIn = payload
    next()
  } catch (err) {
    next(err)
  }
}
