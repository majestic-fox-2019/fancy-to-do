const createError = require('http-errors')
const verify = require('../helper/jwtVerify')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.token
        const authData = verify(token) //kita hanya pake ini sekali
        req.user = authData.user
        next()
    } catch (error) {
        next(createError(403, {
            message: {
                error: "Forbidden"
            }
        }))
    }
}