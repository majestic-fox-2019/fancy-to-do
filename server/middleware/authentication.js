
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = function authenticated (req,res,next){
  try {
    const token = req.headers.token
    const user = jwt.verify(token, process.env.SECRET_CODE)
    req.user = user
    next()
  } catch (error) {
    throw createError(403,'Unathentication')
  }
}
