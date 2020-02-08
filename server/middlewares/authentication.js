const { jwtVerify } = require('../helper/helper')
module.exports = function(req,res,next){
  try {
    let token = jwtVerify(req.headers.token)
    req.user = token
    next()
  } catch (error) {
    next(error)
  }
}