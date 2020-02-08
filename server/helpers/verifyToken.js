const jwt = require('jsonwebtoken')

function verifyToken(token){
    return jwt.verify(token, process.env.SECRET_CODE)
}

module.exports = {verifyToken}