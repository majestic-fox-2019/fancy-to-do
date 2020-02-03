const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        const token = req.headers.token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            req.payload = payload
            next()
        } catch (error) {
            res.status(400).json({ error, message: "failed to authenticate" })
        }
    } else {
        res.status(400).json({ message: "please login first" })
    }
}

module.exports = authentication