// if (process.env.NODE_ENV === 'development') {
//     require('dotenv').config()
// }
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    try {
        const token = req.headers.token
        const user = jwt.verify(token, process.env.SECRET_CODE)
        req.user = user
        next()
    } catch (error) {
        res.status(404).json(error)
    }
}