"use strict"

const bcrypt = require('bcrypt')

function generatePassword(password) {
    var salt = bcrypt.genSaltSync(8);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    generatePassword,
    checkPassword
}