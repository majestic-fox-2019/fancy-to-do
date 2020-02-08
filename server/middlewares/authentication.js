module.exports = (req, res, next) =>{
    const {verifyToken} = require('../helpers/verifyToken')
    const {User} = require('../models')
    const createError = require('http-errors')
    
    try {
        const userToken = verifyToken(req.headers.token)
        User
        .findOne({
            where:{
                id: userToken.id
            }
        })
        .then(data =>{
            if (data) {
                req.user = userToken.id
                next()
            }else{
                throw next(createError(404, 'User Not Found'))
            }
        })
    } catch (error) {
        next(error)
    }
}