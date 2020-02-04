const jwt = require("jsonwebtoken")

module.exports= (req, res, next)=>{
    try {
        const token = req.headers.token
        const user = jwt.verify(token, process.env.secretCode)
        req.user = user
        next()
    } catch (error) {
        throw {
            statusCode: 400,
            msg: "Wrong username / password"
        }
    }
}