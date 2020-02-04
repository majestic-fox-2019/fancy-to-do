if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const User = require('../models/user')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token
    const user = jwt.verify(token, process.env.SECRET_CODE)
    req.user = user 
    // user ini beneran ada di db kita atau ngk?
    next()
  } catch (error) {
    next(createError(404, {message: { error: 'Invalid Token'}}))
  }
}