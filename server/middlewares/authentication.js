const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  try{
    console.log(req.headers.token)
    const token = req.headers.token
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } 
  catch (error) {
    next({code:401, message:"invalid token"})
  }
}