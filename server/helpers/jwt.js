const jwt = require("jsonwebtoken")

function createToken(user) {
    console.log(user, 'masuk createtoken')
    return jwt.sign(user, process.env.SECRET_CODE)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_CODE)
}

module.exports = {
    createToken,
    verifyToken
}