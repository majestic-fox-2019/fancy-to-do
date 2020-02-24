function compare(loginPassword, userPassword) {
  const bcrypt = require('bcrypt')

  return bcrypt.compare(loginPassword, userPassword)
}

module.exports = compare
