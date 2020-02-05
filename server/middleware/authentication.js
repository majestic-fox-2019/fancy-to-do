const {decodeToken} = require('../helper/jwt')

module.exports = (req, res, next) => {
  if(req.headers.token){
    console.log(req.headers.token,'<<')
    req.user = decodeToken(req.headers.token,process.env.secret_code)
    next()
  }else{
    throw {
      status: 400,
      message: 'token invalid'
    }
  }
}