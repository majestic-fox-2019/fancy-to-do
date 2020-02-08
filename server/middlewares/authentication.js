if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const createError = require('http-errors')
const {verifyToken} = require('../helpers/jwt')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token
    const user = verifyToken(token)
    req.user = user
    console.log(req.user)
    next()
  } catch (error) {
    next(createError(404, {message: { message: 'Not Found Token'}}))
  }
}