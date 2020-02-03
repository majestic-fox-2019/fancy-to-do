const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if(!req.headers.hasOwnProperty('token')){
        res.status(401).json({message: 'You need to login to see this page'})
    } else {
        try {
            require('dotenv').config()
            // console.log(req.headers.token)
            req.loggedUser = jwt.verify(req.headers.token, process.env.JWT_SECRET)

            next()
        }
        catch (e) {
            res.status(400).json({message: 'Invalid token'})
        }
    }
}