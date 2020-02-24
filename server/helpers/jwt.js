const jwt = require('jsonwebtoken')

function sign(data, secret) {
  return jwt.sign(data, secret)
}

function verify(data, secret) {
  return jwt.verify(data, secret)
}

module.exports = { sign, verify }
