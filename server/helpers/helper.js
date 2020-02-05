const jwt = require('jsonwebtoken')

function changeFormatDate(date){
    return date.toLocaleDateString('en-GB')
    // let day = date.getDate()
    // let month = date.getMonth() + 1
    // let year = date.getFullYear()

    // return `${year}-${month}-${day}`
}

function generate(payload){
    return jwt.sign(payload, process.env.secret_key)
}

function verification(token){
    return jwt.verify(token, process.env.secret_key)
}


module.exports = { changeFormatDate, generate, verification }