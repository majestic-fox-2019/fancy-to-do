'use strict'

const bcrypt = require('bcrypt')
const saltRounds = 8

function hash (password){
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashing = bcrypt.hashSync(password, salt)
    return hashing
}

function compare (password, hash) {
    const comparing = bcrypt.compareSync(password, hash)
    return comparing
}

module.exports = {
    hash,
    compare
}