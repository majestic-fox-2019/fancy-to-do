const bcrypt = require('bcrypt')

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

module.exports = {encryptPassword}