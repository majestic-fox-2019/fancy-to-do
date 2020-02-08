function generateToken(payload) {
  let jwt = require('jsonwebtoken')
  let token = jwt.sign(payload, process.env.JWT_SECRET)

  return token
}

module.exports = generateToken
