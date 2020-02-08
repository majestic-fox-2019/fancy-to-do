const jwt = require('jsonwebtoken')

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  return year + '-' + month + '-' + day;
}

function jwtSign(password){
  return jwt.sign(password,process.env.secret_key)
}

function jwtVerify(password){
  return jwt.verify(password,process.env.secret_key)
}
module.exports = {formatDate, jwtSign, jwtVerify}