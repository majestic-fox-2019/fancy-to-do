'use strict'

const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const bearerHeader = req.headers['authorization']
    const bearer= bearerHeader.split(" ")
    const bearerToken= bearer[1]

    const verivyToken = jwt.verify(bearerToken, process.env.JWT_KEY)
    
    if(!verivyToken) throw ({code: 403, message: "forbidden"})
    
    req.id = verivyToken.id

    next()
}