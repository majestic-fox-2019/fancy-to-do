const bcrypt = require('bcrypt')

function hashPass(plainPass) {
  const salt = bcrypt.genSaltSync(8)
  const hash = bcrypt.hashSync(plainPass, salt)
  return hash
}

function comparePass(plain, hash) {
  const compare = bcrypt.compareSync(plain, hash)
  return compare
}

module.exports = { hashPass, comparePass }
