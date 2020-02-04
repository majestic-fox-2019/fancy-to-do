const helper = require('../helpers/helper')

module.exports = (req, res, next) => {
    try {
        if(req.headers.token){
            req.user = helper.verification(req.headers.token)
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