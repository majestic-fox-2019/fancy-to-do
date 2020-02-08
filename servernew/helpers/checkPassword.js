const bcrypt = require('bcrypt')

function checkPassword(plainPassword, hash) {
    const match = bcrypt.compareSync(plainPassword, hash)
    return match
}

module.exports = checkPassword