const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    // console.log(req.headers.hasOwnProperty('token'))
    if(!req.headers.hasOwnProperty('token')){
        // console.log('WHAAAAAAAAAAATTTTTTTT')
        res.status(401).json({message: 'You need to login to see this page'})
    } else {
        try {
            require('dotenv').config()
            // console.log(req.headers.token)
            req.loggedUser = jwt.verify(req.headers.token, process.env.JWT_SECRET)
            // console.log(req.loggedUser.id)
            next()
        }
        catch (e) {
            res.status(400).json({message: 'Invalid token'})
        }
    }
}