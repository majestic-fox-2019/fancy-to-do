function errHandler(err, req, res, next) {
    if (err.code) {
        res.status(err.code).json(err.message)
    } else if (err.errors) {
        let message = []
        for (let i of err.errors) {
            message.push(i.message)
        }
        res.status(400).json(message)

    }
    else {
        res.status(500).json({ err, message: "internal server error" })
    }

}

module.exports = errHandler