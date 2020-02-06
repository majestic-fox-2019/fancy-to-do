const jwt = require('jsonwebtoken')

function changeFormatDate(date){
    return date.toLocaleDateString('en-GB')
}

function generate(payload){
    return jwt.sign(payload, process.env.secret_key)
}

function verification(token){
    return jwt.verify(token, process.env.secret_key)
}


module.exports = { changeFormatDate, generate, verification }