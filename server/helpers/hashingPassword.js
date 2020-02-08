const bcrypt = require('bcrypt')
const saltRound = 4

function hashingPassword(password) {
    let hashed = bcrypt.hashSync(password, saltRound)
    return hashed
}

module.exports = hashingPassword