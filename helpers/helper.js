const jwt = require('jsonwebtoken')

exports.authSign = function(user){
  return jwt.sign(user, process.env.SECRET_KEY)
}

exports.authVerify = function(bearer){
  return jwt.verify(bearer, process.env.SECRET_KEY)
}