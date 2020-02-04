const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
  try {
    if(req.headers.token){
      let token = jwt.verify(req.headers.token, 'test')
      if(token){
        req.user = token
        next()
      }
    }else{
      throw next({
        statusCode : 400,
        message : "missing token"
      })
    }
  } catch (error) {
    next(error)
  }
}