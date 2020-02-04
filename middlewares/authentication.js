const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        if(req.headers.token){
            let token = jwt.verify(req.headers.token, process.env.secret_key)
            req.user = token
            next()
        } else {
            throw {
                statusCode: 400,
                message: 'Invalid Token'
            }
        }
    }
    catch (error) {
        next(error)
    }
}