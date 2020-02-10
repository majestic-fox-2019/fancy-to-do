'use strict'

const jwt = require('jsonwebtoken')

function generateToken (id) {
    console.log(id)
    const token = jwt.sign({id}, process.env.JWT_KEY, { expiresIn: '1d' })
    // console.log(token)
    return token
}

function verifyToken (tokenUser) {
    const token = jwt.verify(tokenUser, process.env.JWT_KEY)
    console.log("masuk verify")
    return token
}

module.exports = {
    generateToken,
    verifyToken
}