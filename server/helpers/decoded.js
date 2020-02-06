const jwt = require('jsonwebtoken');

module.exports = function (token) {
  let decoded = jwt.verify(token, 'generate token')

  return decoded
}