const bcrypt = require('bcrypt')

const comparePassword = (plain, encrypted) => {
    return bcrypt.compareSync(plain, encrypted)
}

module.exports = {comparePassword}