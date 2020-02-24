const { verifyToken } = require('../helper/jwt')
const { User } = require('../models/index')
const createError = require('http-errors')

module.exports = (req, res, next) => {
    try {
        const decodedToken = verifyToken(req.headers.token)
        User.findOne({
            where: {
                id: decodedToken.id
            }
        }).then(user => {
            if (user) {
                req.loggedUserId = decodedToken.id
                next()
            } else {
                throw next(createError(404, 'User not found'))
            }
        })
    } catch (error) {
        next(error)
    }
}