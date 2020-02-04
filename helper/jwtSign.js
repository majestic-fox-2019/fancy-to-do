const jwt = require('jsonwebtoken')

function signUser(user){
    return jwt.sign({user}, process.env.SECRET_KEY)
}

module.exports = signUser