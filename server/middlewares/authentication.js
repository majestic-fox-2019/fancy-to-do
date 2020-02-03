const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.token
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        req.loggedIn = verify
        next()
    }
    catch (err) {
        next(err)
    }
}