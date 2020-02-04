
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = function authenticated (req,res,next){
  try {
    const token = req.headers.token
    const user = jwt.verify(token, process.env.SECRET_CODE)
    req.user = user
    next()
  } catch (error) {
    
    let objErr={}
        objErr.statusCode = 401
        objErr.data = 'Unathentication'
        next(objErr)
    //throw createError(403,'ForbiddenError')
  }
}
