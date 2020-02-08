const jwt = require('jsonwebtoken')

function verify(token){
    return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = verify